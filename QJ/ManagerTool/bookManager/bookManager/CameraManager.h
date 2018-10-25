//
//  CameraManager.h
//  bookManager
//
//  Created by zhangpoor on 2018/10/23.
//  Copyright © 2018年 zhangpoor. All rights reserved.
//

#import <UIKit/UIKit.h>


@protocol CameraManagerDelegate <NSObject>

- (void)getValue:(NSString *)value;
- (void)openCamera:(CALayer *)layer;

@end


@interface CameraManager : NSObject

+ (CameraManager *)sharedInstance;


- (void)initCamera;
- (void)openCamera:(UIViewController<CameraManagerDelegate> *)controller
      withCallback:(void(^)(BOOL granted))callback;

@end
