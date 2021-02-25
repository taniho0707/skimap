clear all
close all

%% 地図タイルの各画像を読み込み
im{1,1} = imread('14_14495_6389.png');
im{1,2} = imread('14_14495_6390.png');
im{1,3} = imread('14_14495_6391.png');
im{1,4} = imread('14_14495_6392.png');
im{1,5} = imread('14_14495_6393.png');

im{2,1} = imread('14_14496_6389.png');
im{2,2} = imread('14_14496_6390.png');
im{2,3} = imread('14_14496_6391.png');
im{2,4} = imread('14_14496_6392.png');
im{2,5} = imread('14_14496_6393.png');

%% 複数の地図タイルを結合
im_b = [im{1,1} im{2,1} ;
        im{1,2} im{2,2} ;
        im{1,3} im{2,3} ;
        im{1,4} im{2,4} ;
        im{1,5} im{2,5}];

%% 結合した地図タイルを描画
figure
imshow(im_b)

%% 結合した地図タイルから各ピクセルの標高を演算
im_b = uint64(im_b);

h = im_b(:,:,1)*2^16 + im_b(:,:,2)*2^8 + im_b(:,:,3)*2^0;
h(h==2^23) = NaN;
h = double(h);
h = h * 0.01;

%% 標高を濃淡で表した画像を描画
figure
imshow((h-1300)/800)


%% 3Dマップとして描画
x = ones(256*5,1)*(1:256*2);
y = (1:256*5)'*ones(256*2,1)';

figure
s = surf(x,y,h);
s.EdgeColor = 'none';
