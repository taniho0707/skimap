%% �������R�}���h
clear all
close all

%% �n�}�̊K�w(zoom)�A�ܓx(lati)�A�o�x(long)�A����ܓx(L)���w��
zoom = 14;
lati = 36.729464167467626;
long = 138.52060658854748;
L = 85.05112878;

%% �ܓx�o�x���琢�E���W���s�N�Z���ŉ��Z
x = 2^(zoom+7)*(long/180+1);
y = 2^(zoom+7)/pi*(-atanh(sin(pi/180*lati))+atanh(sin(pi/180*L)));

x_idx = floor(x/256);
x_pix = mod(x,256);
y_idx = floor(y/256);
y_pix = mod(y,256);

%% �w�肳�ꂽ�n�}�̊K�w�ł̃C���f�b�N�X�ƁA�n�}�^�C����ł̃s�N�Z���ʒu�����Z
fprintf('%d/%d/%d (%f,%f)',zoom,x_idx,y_idx,x_pix,y_pix)