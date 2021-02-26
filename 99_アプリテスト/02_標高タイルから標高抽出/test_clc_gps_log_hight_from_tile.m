clear all
close all

%% ���E���W�ϊ��萔�F�n�}�̊K�w(zoom)�A����ܓx(L)���w��
L_LIMIT = 85.05112878;	% �n�}�^�C���̏���ܓx
ZOOM_HIGHT = 14;		% �n�}�̊K�w
TILE_DXDY = 1770;		% �n�}�^�C����ӂ̒���[m]

%% ���O�f�[�^�̓ǂݍ��݂Ǝ�����UTC�ϊ�

gps_log_height = readtable('2021-02-20 09-33-17.xlsx');

gps_log_height.daytime = datetime(gps_log_height.year,...
	                       gps_log_height.month,...
						   gps_log_height.day,...
						   gps_log_height.time,...
						   gps_log_height.min,...
						   gps_log_height.sec,'TimeZone','Asia/Tokyo');
gps_log_height.utc = convertTo(gps_log_height.daytime,'posixtime');

gps_log_height.t = (gps_log_height.utc - gps_log_height.utc(1))/3600;

%% �q��ʐ^�p���[�J�����W�����Z

% ���E���W�ƃ^�C���̃C���f�b�N�X�����Z
gps_log_height.global_pix_x = 2^(ZOOM_HIGHT+7)*(gps_log_height.longitude/180+1);
gps_log_height.global_pix_y = 2^(ZOOM_HIGHT+7)/pi*(-atanh(sin(pi/180*gps_log_height.latitude))+atanh(sin(pi/180*L_LIMIT)));

gps_log_height.global_tile_x_idx = floor(gps_log_height.global_pix_x/256);
gps_log_height.global_tile_y_idx = floor(gps_log_height.global_pix_y/256);
gps_log_height.tile_x_pixcel =mod(gps_log_height.global_pix_x,256);
gps_log_height.tile_y_pixcel =mod(gps_log_height.global_pix_y,256);

% �K�v�ȃ^�C���͈̔͂����Z
global_x_idx_max = max(gps_log_height.global_tile_x_idx);
global_x_idx_min = min(gps_log_height.global_tile_x_idx);
global_y_idx_max = max(gps_log_height.global_tile_y_idx);
global_y_idx_min = min(gps_log_height.global_tile_y_idx);

% ���[�J�����W���v�Z
gps_log_height.local_x_pixcel = (gps_log_height.global_tile_x_idx - global_x_idx_min)*256 + gps_log_height.tile_x_pixcel;
gps_log_height.local_y_pixcel = (gps_log_height.global_tile_y_idx - global_y_idx_min)*256 + gps_log_height.tile_y_pixcel;

%% �����W���^�C��������

% hight_tile�ɊY���̕W���^�C�����Ȃ��ꍇ�A���y�n���@����_�E�����[�h
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

% �W���^�C��������
for x = global_x_idx_min:1:global_x_idx_max
	for y = global_y_idx_min:1:global_y_idx_max
		x_idx = x - global_x_idx_min + 1;
		y_idx = y - global_y_idx_min + 1;
		im{y_idx,x_idx} = imread(sprintf('hight_tile/%d_%d_%d.png',ZOOM_HIGHT,x,y));
	end
end

%% PNG�`���̌����W���^�C������W���l�����Z

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

%% �o�H�̕W�����Z�o

for i=1:1:height(gps_log_height)
	gps_log_height.height_map(i) = im_h(floor(gps_log_height.local_y_pixcel(i)),floor(gps_log_height.local_x_pixcel(i)));
end

figure
plot(gps_log_height.t,gps_log_height.height_map)
grid on

%% �n�`��3D�ŕ\����GPS���O�o�H���I�[�o�[���C

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
