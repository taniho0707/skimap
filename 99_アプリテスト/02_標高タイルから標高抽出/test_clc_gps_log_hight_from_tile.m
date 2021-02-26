clear all
close all

%% 世界座標変換定数：地図の階層(zoom)、上限緯度(L)を指定
L_LIMIT = 85.05112878;	% 地図タイルの上限緯度
ZOOM_HIGHT = 14;		% 地図の階層
TILE_DXDY = 1770;		% 地図タイル一辺の長さ[m]

%% ログデータの読み込みと時刻のUTC変換

gps_log_height = readtable('2021-02-20 09-33-17.xlsx');

gps_log_height.daytime = datetime(gps_log_height.year,...
	                       gps_log_height.month,...
						   gps_log_height.day,...
						   gps_log_height.time,...
						   gps_log_height.min,...
						   gps_log_height.sec,'TimeZone','Asia/Tokyo');
gps_log_height.utc = convertTo(gps_log_height.daytime,'posixtime');

gps_log_height.t = (gps_log_height.utc - gps_log_height.utc(1))/3600;

%% 航空写真用ローカル座標を演算

% 世界座標とタイルのインデックスを演算
gps_log_height.global_pix_x = 2^(ZOOM_HIGHT+7)*(gps_log_height.longitude/180+1);
gps_log_height.global_pix_y = 2^(ZOOM_HIGHT+7)/pi*(-atanh(sin(pi/180*gps_log_height.latitude))+atanh(sin(pi/180*L_LIMIT)));

gps_log_height.global_tile_x_idx = floor(gps_log_height.global_pix_x/256);
gps_log_height.global_tile_y_idx = floor(gps_log_height.global_pix_y/256);
gps_log_height.tile_x_pixcel =mod(gps_log_height.global_pix_x,256);
gps_log_height.tile_y_pixcel =mod(gps_log_height.global_pix_y,256);

% 必要なタイルの範囲を演算
global_x_idx_max = max(gps_log_height.global_tile_x_idx);
global_x_idx_min = min(gps_log_height.global_tile_x_idx);
global_y_idx_max = max(gps_log_height.global_tile_y_idx);
global_y_idx_min = min(gps_log_height.global_tile_y_idx);

% ローカル座標を計算
gps_log_height.local_x_pixcel = (gps_log_height.global_tile_x_idx - global_x_idx_min)*256 + gps_log_height.tile_x_pixcel;
gps_log_height.local_y_pixcel = (gps_log_height.global_tile_y_idx - global_y_idx_min)*256 + gps_log_height.tile_y_pixcel;

%% 結合標高タイルを準備

% hight_tileに該当の標高タイルがない場合、国土地理院からダウンロード
dl_cnt = 0;
for x = global_x_idx_min:1:global_x_idx_max
	for y = global_y_idx_min:1:global_y_idx_max
		if( exist(sprintf('hight_tile/%d_%d_%d.png',ZOOM_HIGHT,x,y)) == 0 )
			dl_cnt = dl_cnt + 1;
			websave(sprintf('hight_tile/%d_%d_%d.png',ZOOM_HIGHT,x,y),sprintf('https://cyberjapandata.gsi.go.jp/xyz/dem_png/%d/%d/%d.png',ZOOM_HIGHT,x,y));
			fprintf('Downloading...(%03d) : hight_tile/%d_%d_%d.jpg\r',dl_cnt,ZOOM_HIGHT,x,y)
		end
	end
end

if(dl_cnt == 0)
	fprintf('There was no download(Local data may have existed)\n\r')
end

% 標高タイルを結合
for x = global_x_idx_min:1:global_x_idx_max
	for y = global_y_idx_min:1:global_y_idx_max
		x_idx = x - global_x_idx_min + 1;
		y_idx = y - global_y_idx_min + 1;
		im{y_idx,x_idx} = imread(sprintf('hight_tile/%d_%d_%d.png',ZOOM_HIGHT,x,y));
	end
end

%% PNG形式の結合標高タイルから標高値を演算

im = cell2mat(im);
im = uint64(im);

im_h = im(:,:,1)*2^16 + im(:,:,2)*2^8 + im(:,:,3)*2^0;
im_h(im_h==2^23) = NaN;
im_h = double(im_h);
im_h = im_h * 0.01;

figure
im_h_min = min(min(im_h));
im_h_max = max(max(im_h));
imshow( (im_h-im_h_min)/(im_h_max-im_h_min)  )
hold on
plot(gps_log_height.local_x_pixcel,gps_log_height.local_y_pixcel)

%% 経路の標高を算出

for i=1:1:height(gps_log_height)
	gps_log_height.height_map(i) = im_h(floor(gps_log_height.local_y_pixcel(i)),floor(gps_log_height.local_x_pixcel(i)));
end

figure
plot(gps_log_height.t,gps_log_height.height_map)
grid on

%% 地形を3Dで表示しGPSログ経路をオーバーレイ

[size_y,size_x] = size(im_h);
x = ones(size_y,1)*(1:size_x);
y = (size_y:-1:1)'*ones(size_x,1)';

x = x * TILE_DXDY/256;
y = y * TILE_DXDY/256;

figure
s = surf(x,y,im_h);
s.EdgeColor = 'none';
camproj('perspective ')
axis equal
hold on
plot3(gps_log_height.local_x_pixcel*TILE_DXDY/256,(size_y-gps_log_height.local_y_pixcel)*TILE_DXDY/256,gps_log_height.height_map,'r')
