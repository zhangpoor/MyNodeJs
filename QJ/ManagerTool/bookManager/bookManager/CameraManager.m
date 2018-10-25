//
//  CameraManager.m
//  bookManager
//
//  Created by zhangpoor on 2018/10/23.
//  Copyright © 2018年 zhangpoor. All rights reserved.
//

#import "CameraManager.h"
#import <AVFoundation/AVFoundation.h>


@interface CameraManager()<AVCaptureMetadataOutputObjectsDelegate>
{
    BOOL _cameraInited;
}

@property(nonatomic,strong)AVCaptureSession *session;
@property(nonatomic,weak)UIViewController<CameraManagerDelegate> *delegate;

@end



@implementation CameraManager


+ (CameraManager *)sharedInstance
{
    static CameraManager *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [CameraManager new];

    });
    return instance;
}



- (void)initCamera
{
    //获取摄像设备
    AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    //创建输入流
    AVCaptureDeviceInput *input = [AVCaptureDeviceInput deviceInputWithDevice:device error:nil];
    //创建输出流
    AVCaptureMetadataOutput *output = [[AVCaptureMetadataOutput alloc]init];
    //设置代理 在主线程里刷新
    [output setMetadataObjectsDelegate:self queue:dispatch_get_main_queue()];
    
    //初始化链接对象
    self.session = [[AVCaptureSession alloc]init];
    //高质量采集率
    [self.session setSessionPreset:AVCaptureSessionPresetHigh];
    [self.session addInput:input];
    [self.session addOutput:output];
    //设置扫码支持的编码格式(如下设置条形码和二维码兼容)
    output.metadataObjectTypes=@[AVMetadataObjectTypeQRCode,//二维码
                                 //以下为条形码，如果项目只需要扫描二维码，下面都不要写
                                 AVMetadataObjectTypeEAN13Code,
                                 AVMetadataObjectTypeEAN8Code,
                                 AVMetadataObjectTypeUPCECode,
                                 AVMetadataObjectTypeCode39Code,
                                 AVMetadataObjectTypeCode39Mod43Code,
                                 AVMetadataObjectTypeCode93Code,
                                 AVMetadataObjectTypeCode128Code,
                                 AVMetadataObjectTypePDF417Code];
    
    _cameraInited = YES;
}

- (void)openCamera:(UIViewController<CameraManagerDelegate> *)controller
      withCallback:(void(^)(BOOL granted))callback
{
    self.delegate = controller;
    __weak typeof(self) _weakSelf = self;
    if(_cameraInited){
        dispatch_async(dispatch_get_main_queue(), ^{
            [_weakSelf loadScanView];
        });
        if (callback) {
            callback(YES);
        }
    }
    else{
        
        [AVCaptureDevice requestAccessForMediaType:AVMediaTypeVideo
                                 completionHandler:
         ^(BOOL granted) {
             if (granted) {
                 
                 [_weakSelf initCamera];

                 dispatch_async(dispatch_get_main_queue(), ^{
                     [_weakSelf loadScanView];
                 });
                 
             }
             if (callback) {
                 callback(granted);
             }
         }];
    }
}

- (void)loadScanView {
    
    AVCaptureVideoPreviewLayer *layer = [AVCaptureVideoPreviewLayer layerWithSession:self.session];
    layer.videoGravity = AVLayerVideoGravityResizeAspectFill;
    if (self.delegate) {
        [self.delegate openCamera:layer];
    }
    
    //开始捕获
    [self.session startRunning];
}


- (void)    captureOutput:(AVCaptureOutput *)output
 didOutputMetadataObjects:(NSArray<__kindof AVMetadataObject *> *)metadataObjects
           fromConnection:(AVCaptureConnection *)connection
{
    if (metadataObjects.count > 0) {
        [self.session stopRunning];
        AVMetadataMachineReadableCodeObject *metadataObject = metadataObjects[0];
        
        NSLog(@"didOutputMetadataObjects[0]:%@",metadataObject.stringValue);
        if (self.delegate && [self.delegate respondsToSelector:@selector(getValue:)]) {
            [self.delegate getValue:metadataObject.stringValue];
        }
    }
}




@end
