%% 初期化コマンド
clear all
close all

%% 地図の階層(zoom)、緯度(lati)、経度(long)、上限緯度(L)を指定
zoom = 14;
lati = 36.729464167467626;
long = 138.52060658854748;
L = 85.05112878;

%% 緯度経度から世界座標をピクセルで演算
x = 2^(zoom+7)*(long/180+1);
y = 2^(zoom+7)/pi*(-atanh(sin(pi/180*lati))+atanh(sin(pi/180*L)));

x_idx = floor(x/256);
x_pix = mod(x,256);
y_idx = floor(y/256);
y_pix = mod(y,256);

%% 指定された地図の階層でのインデックスと、地図タイル状でのピクセル位置を演算
fprintf('%d/%d/%d (%f,%f)',zoom,x_idx,y_idx,x_pix,y_pix)