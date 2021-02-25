clear all
close all

%% �n�}�^�C���̊e�摜��ǂݍ���
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

%% �����̒n�}�^�C��������
im_b = [im{1,1} im{2,1} ;
        im{1,2} im{2,2} ;
        im{1,3} im{2,3} ;
        im{1,4} im{2,4} ;
        im{1,5} im{2,5}];

%% ���������n�}�^�C����`��
figure
imshow(im_b)

%% ���������n�}�^�C������e�s�N�Z���̕W�������Z
im_b = uint64(im_b);

h = im_b(:,:,1)*2^16 + im_b(:,:,2)*2^8 + im_b(:,:,3)*2^0;
h(h==2^23) = NaN;
h = double(h);
h = h * 0.01;

%% �W����Z�W�ŕ\�����摜��`��
figure
imshow((h-1300)/800)


%% 3D�}�b�v�Ƃ��ĕ`��
x = ones(256*5,1)*(1:256*2);
y = (1:256*5)'*ones(256*2,1)';

figure
s = surf(x,y,h);
s.EdgeColor = 'none';
