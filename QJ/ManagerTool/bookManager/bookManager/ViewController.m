//
//  ViewController.m
//  bookManager
//
//  Created by zhangpoor on 2018/10/23.
//  Copyright © 2018年 zhangpoor. All rights reserved.
//

#import "ViewController.h"

#import "CameraManager.h"
#import "BusinessManager.h"


@interface ViewController ()<CameraManagerDelegate>
{
    NSString *_tempISBN;
}


@property(nonatomic,strong)UIButton *openCameraBtn;
@property(nonatomic,strong)UIButton *addBtn;
@property(nonatomic,strong)UIButton *clearBtn;
@property(nonatomic,strong)UITextView *displayView;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    
    [self initParam];
    [self initUI];
}

#pragma mark- <init>
- (void)initParam
{
    [self.openCameraBtn addTarget:self
                           action:@selector(openCameraAction:)
                 forControlEvents:UIControlEventTouchUpInside];
    [self.addBtn addTarget:self
                           action:@selector(addAction:)
                 forControlEvents:UIControlEventTouchUpInside];
    [self.clearBtn  addTarget:self
                           action:@selector(clearAction:)
                 forControlEvents:UIControlEventTouchUpInside];
}

- (void)initUI
{
    self.title = @"首 页";
    self.view.backgroundColor = [UIColor grayColor];
    
    [self.view addSubview:self.openCameraBtn];
    [self.view addSubview:self.addBtn];
    [self.view addSubview:self.clearBtn];
    
    [self.view addSubview:self.displayLab];
    
    self.openCameraBtn.frame = CGRectMake(20, 90, 90, 40);
    self.addBtn.frame = CGRectMake(20 + 90 + 5, 90, 90, 40);
    self.clearBtn.frame = CGRectMake(20 + 90 + 5 + 90 + 5, 90, 90, 40);
    
    self.displayLab.frame = CGRectMake(20, 160, 350, 500);
}


#pragma mark- <function>
- (void)setDisplay:(NSString *)str
{
    dispatch_async(dispatch_get_main_queue(), ^{
        self.displayView.text = [[self.displayView.text stringByAppendingString:@"\r\n"] stringByAppendingString:str];
    });
}

#pragma mark- <acion>
- (void)openCameraAction:(UIButton *)aBtn
{

    aBtn.enabled = NO;
    __weak typeof(self) _weakSelf = self;
    [[CameraManager sharedInstance] openCamera:self withCallback:
     ^(BOOL granted) {
         if (!granted) {

            [_weakSelf setDisplay: @"\r\n无权限访问相机"];

         }
         aBtn.enabled = YES;
    }];
    
}

- (void)addAction:(UIButton *)aBtn
{
    if (_tempISBN) {
        UIAlertController *_alert = [UIAlertController alertControllerWithTitle:@"警 告"
                                                                        message:
                                     [NSString stringWithFormat:@"确认是否添加 isbn-%@,到书库？",_tempISBN]
                                                                 preferredStyle:UIAlertControllerStyleAlert];
        __weak typeof(self) _weakSelf = self;
        UIAlertAction *_addAction = [UIAlertAction actionWithTitle:@"添加" style:UIAlertActionStyleDefault
                                                           handler:
         ^(UIAlertAction * _Nonnull action) {
             
             [[BusinessManager sharedInstance] addBook:self->_tempISBN
                                              callback:^(BOOL isSuccess, id info) {
                                                  if (isSuccess) {
                                                      self->_tempISBN = nil;
                                                  }
                                                  [_weakSelf setDisplay:info];
                                              }];
              
         }];
        
        UIAlertAction *_cancelAction = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel
                                                           handler:
                                     ^(UIAlertAction * _Nonnull action) {
                                         
                                     }];
        [_alert addAction:_addAction];
        [_alert addAction:_cancelAction];
        
        [self presentViewController:_alert animated:YES completion:^{
            
        }];
        
    } else {
        [self setDisplay:@"请先扫下条形码～"];
    }
}

- (void)clearAction:(UIButton *)aBtn
{
    
}

#pragma mark- <getter>
- (UIButton *)openCameraBtn
{
    if (!_openCameraBtn) {
        _openCameraBtn = [UIButton buttonWithType:UIButtonTypeSystem];
        _openCameraBtn.backgroundColor = [UIColor orangeColor];
        _openCameraBtn.layer.cornerRadius = 8;
        [_openCameraBtn setTitle:@"扫码" forState:UIControlStateNormal];
        [_openCameraBtn setTitle:@"扫码" forState:UIControlStateHighlighted];
        [_openCameraBtn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
        [_openCameraBtn setTitleColor:[UIColor greenColor] forState:UIControlStateHighlighted];
    }
    
    return _openCameraBtn;
}

- (UIButton *)clearBtn
{
    if (!_clearBtn) {
        _clearBtn = [UIButton buttonWithType:UIButtonTypeSystem];
        _clearBtn.backgroundColor = [UIColor orangeColor];
        _clearBtn.layer.cornerRadius = 8;
        [_clearBtn setTitle:@"清屏" forState:UIControlStateNormal];
        [_clearBtn setTitle:@"清屏" forState:UIControlStateHighlighted];
        [_clearBtn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
        [_clearBtn setTitleColor:[UIColor greenColor] forState:UIControlStateHighlighted];
    }
    
    return _clearBtn;
}

- (UIButton *)addBtn
{
    if (!_addBtn) {
        _addBtn = [UIButton buttonWithType:UIButtonTypeSystem];
        _addBtn.backgroundColor = [UIColor orangeColor];
        _addBtn.layer.cornerRadius = 8;
        [_addBtn setTitle:@"入库" forState:UIControlStateNormal];
        [_addBtn setTitle:@"入库" forState:UIControlStateHighlighted];
        [_addBtn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
        [_addBtn setTitleColor:[UIColor greenColor] forState:UIControlStateHighlighted];
    }
    return _addBtn;
}


- (UITextView *)displayLab
{
    if (!_displayView) {
        _displayView = [UITextView new];
        _displayView.backgroundColor = [UIColor whiteColor];
        _displayView.textColor = [UIColor blackColor];
        _displayView.font = [UIFont systemFontOfSize:14];
        _displayView.textAlignment = NSTextAlignmentLeft;
        _displayView.showsHorizontalScrollIndicator = NO;
        _displayView.showsVerticalScrollIndicator = YES;
    }
    return _displayView;
}

#pragma mark- <CameraManagerDelegate>
- (void)getValue:(NSString *)value
{
    [self.navigationController popViewControllerAnimated:YES];
    [self setDisplay:[@"\r\n扫描到isbn:" stringByAppendingString:value]];
    __weak typeof(self) _weakSelf = self;
    _tempISBN = value;
    [[BusinessManager sharedInstance] scanISBN:value
                                      callback:
     ^(BOOL isSuccess, id info) {
         [_weakSelf setDisplay:info];
    }];
}

- (void)openCamera:(CALayer *)layer
{
    layer.frame = self.view.layer.bounds;
    UIViewController *_cameraController = [UIViewController new];
    [_cameraController.view.layer insertSublayer:layer atIndex:0];
    _cameraController.title = @"扫 描";
    [self.navigationController pushViewController:_cameraController animated:YES];
}

@end
