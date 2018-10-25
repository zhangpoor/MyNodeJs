//
//  BusinessManager.m
//  bookManager
//
//  Created by zhangpoor on 2018/10/24.
//  Copyright © 2018年 zhangpoor. All rights reserved.
//

#import "BusinessManager.h"
#import "HttpManager.h"

//static NSString *_baseUrl = @"http://10.180.184.35:13014";
static NSString *_baseUrl = @"http://172.19.19.96:13014";


@interface BusinessManager()

@end

@implementation BusinessManager
+ (BusinessManager *)sharedInstance
{
    static BusinessManager *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [BusinessManager new];
        
    });
    return instance;
}

- (void)scanISBN:(NSString *)isbn
        callback:(Callback)callback
{
    [HttpManager startRequest:RequestTypePost
                          url:[_baseUrl stringByAppendingString:@"/api/scanISBN"]
                     jSonInfo:@{@"isbn":isbn?:@""}
                     callback:
     ^(BOOL isSuccess, NSDictionary *result) {
         NSArray *_ary = (NSArray *)(result[@"data"]);
         NSString *_str = @"请求失败";
         if (isSuccess) {
             NSMutableString *_s = [@"" mutableCopy];
             [_s appendFormat:@"查询到%lu个结果",(unsigned long)_ary.count];
             
             for (int i = 0; i < _ary.count; ++i) {
                 [_s appendFormat:@"\r\ni_%d,b_id:%@",i,_ary[i][@"b_id"]];
             }
             _str = _s;
         }
         
         if (callback) {
             callback(isSuccess,_str);
         }
    }];
}

- (void)addBook:(NSString *)isbn
       callback:(Callback)callback
{
    if (!isbn) {
        if (callback) {
            callback(NO,@"请先扫描条形码");
        }
        return;
    }
    
    [HttpManager startRequest:RequestTypePost
                          url:[_baseUrl stringByAppendingString:@"/api/addBook"]
                     jSonInfo:@{@"isbn":isbn?:@""}
                     callback:
     ^(BOOL isSuccess, NSDictionary *result) {
         BOOL _flag = isSuccess;
         NSString *_str = @"请求失败";
         if (isSuccess) {
             /*
              (lldb) po result[@"data"]
              {
              insertId = 259;
              msg = "\U5165\U4fe1\U606f\U5e93\U6210\U529f
              \n\U5f55\U5165\U4e66\U5e93\U6210\U529f,insertId\Uff1a259";
              }
              */
             if (result[@"data"][@"insertId"]) {
                 _flag = YES;
             }
             _str = result[@"data"][@"msg"];
         }
         
         if (callback) {
             callback(_flag,_str);
         }
         
     }];
}

@end
