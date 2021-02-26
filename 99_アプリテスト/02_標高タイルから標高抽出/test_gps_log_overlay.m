clear all
close all

%% 世界座標変換定数：地図の階層(zoom)、上限緯度(L)を指定
L_LIMIT = 85.05112878;
ZOOM_PIC = 16;

%% ログデータの読み込みと時刻のUTC変換

gps_log_pic = readtable('2021-02-20 09-33-17.xlsx');

gps_log_pic.daytime = datetime(gps_log_pic.year,...
	                       gps_log_pic.month,...
						   gps_log_pic.day,...
						   gps_log_pic.time,...
						   gps_log_pic.min,...
						   gps_log_pic.sec,'TimeZone','Asia/Tokyo');
gps_log_pic.utc = convertTo(gps_log_pic.daytime,'posixtime');

gps_log_pic.t = (gps_log_pic.utc - gps_log_pic.utc(1))/3600;

%% 航空写真用ローカル座標を演算

% 世界座標とタイルのインデックスを演算
gps_log_pic.global_pix_x = 2^(ZOOM_PIC+7)*(gps_log_pic.longitude/180+1);
gps_log_pic.global_pix_y = 2^(ZOOM_PIC+7)/pi*(-atanh(sin(pi/180*gps_log_pic.latitude))+atanh(sin(pi/180*L_LIMIT)));

gps_log_pic.global_tile_x_idx = floor(gps_log_pic.global_pix_x/256);
gps_log_pic.global_tile_y_idx = floor(gps_log_pic.global_pix_y/256);
gps_log_pic.tile_x_pixcel =mod(gps_log_pic.global_pix_x,256);
gps_log_pic.tile_y_pixcel =mod(gps_log_pic.global_pix_y,256);

% 必要なタイルの範囲を演算
global_x_idx_max = max(gps_log_pic.global_tile_x_idx);
global_x_idx_min = min(gps_log_pic.global_tile_x_idx);
global_y_idx_max = max(gps_log_pic.global_tile_y_idx);
global_y_idx_min = min(gps_log_pic.global_tile_y_idx);

% タイル結合時のアスペクト比を16:9に近づけるため、タイルの範囲を補正
im_ratio = (global_x_idx_max - global_x_idx_min + 1) / (global_y_idx_max - global_y_idx_min + 1);

if( im_ratio > (16/9) )
	y_length = floor( (global_x_idx_max - global_x_idx_min) * 9/16 );
	y_length_add = y_length - (global_y_idx_max - global_y_idx_min + 1);
	if(mod(2,y_length_add) == 0)
		global_y_idx_max = global_y_idx_max + y_length_add/2;
		global_y_idx_min = global_y_idx_min - y_length_add/2;
	else
		global_y_idx_max = global_y_idx_max + floor(y_length_add/2);
		global_y_idx_min = global_y_idx_min - ceil(y_length_add/2);
	end
else
	x_length = floor( (global_y_idx_max - global_y_idx_min) * 16/9 );
	x_length_add = x_length - (global_x_idx_max - global_x_idx_min + 1);
	if(mod(2,x_length_add) == 0)
		global_x_idx_max = global_x_idx_max + x_length_add/2;
		global_x_idx_min = global_x_idx_min - x_length_add/2;
	else
		global_x_idx_max = global_x_idx_max + floor(x_length_add/2);
		global_x_idx_min = global_x_idx_min - ceil(x_length_add/2);
	end
end

% ローカル座標を計算
gps_log_pic.local_x_pixcel = (gps_log_pic.global_tile_x_idx - global_x_idx_min)*256 + gps_log_pic.tile_x_pixcel;
gps_log_pic.local_y_pixcel = (gps_log_pic.global_tile_y_idx - global_y_idx_min)*256 + gps_log_pic.tile_y_pixcel;

%% 航空写真を準備

% tile_dataに該当のタイルがない場合、国土地理院からダウンロード
dl_cnt = 0;
for x = global_x_idx_min:1:global_x_idx_max
	for y = global_y_idx_min:1:global_y_idx_max
		if( exist(sprintf('tile_data/%d_%d_%d.jpg',ZOOM_PIC,x,y)) == 0 )
			dl_cnt = dl_cnt + 1;
			websave(sprintf('tile_data/%d_%d_%d.jpg',ZOOM_PIC,x,y),sprintf('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/%d/%d/%d.jpg',ZOOM_PIC,x,y));
			fprintf('Downloading...(%03d) : tile_data/%d_%d_%d.jpg\r',dl_cnt,ZOOM_PIC,x,y)
		end
	end
end

if(dl_cnt == 0)
	fprintf('There was no download(Local data may have existed)\n\r')
end
% タイルを結合

for x = global_x_idx_min:1:global_x_idx_max
	for y = global_y_idx_min:1:global_y_idx_max
		x_idx = x - global_x_idx_min + 1;
		y_idx = y - global_y_idx_min + 1;
		im{y_idx,x_idx} = imread(sprintf('tile_data/%d_%d_%d.jpg',ZOOM_PIC,x,y));
	end
end

%% 航空写真にGPSログをオーバーレイして描画

im = cell2mat(im);

figure
imshow(im)
hold on
plot(gps_log_pic.local_x_pixcel,gps_log_pic.local_y_pixcel)

