//
//  HttpManager.m
//  bookManager
//
//  Created by zhangpoor on 2018/10/24.
//  Copyright © 2018年 zhangpoor. All rights reserved.
//

#import "HttpManager.h"

@interface HttpManager()

@end


@implementation HttpManager


+ (void)startRequest:(RequestType)tp
                 url:(NSString *)url
            jSonInfo:(NSDictionary *)info
            callback:(void(^)(BOOL isSuccess,NSDictionary *result))callback
{
    if (url) {
        NSURL *_url = [NSURL URLWithString:url];
        NSMutableURLRequest *mutableRequest = [NSMutableURLRequest requestWithURL:_url];
        switch (tp) {
            case RequestTypeGet:{
                //[mutableRequest setHTTPMethod:@"POST"];
            } break;
            case RequestTypePost:
            default:{
                [mutableRequest setHTTPMethod:@"POST"];
            } break;
        }
        
        NSData *_data = [NSJSONSerialization dataWithJSONObject:info
                                                        options:NSJSONWritingPrettyPrinted
                                                          error:nil];
        if (_data) {
            [mutableRequest setHTTPBody:_data];
        }
        NSURLSession *session = [NSURLSession sharedSession];
        NSURLSessionDataTask *_dataTask = [session dataTaskWithRequest:mutableRequest
                                                     completionHandler:
        ^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
            NSDictionary *_r = nil;
            BOOL _iS = NO;
            if (error) {
                
                NSLog(@"Request_error:%@",error.userInfo);
                _r = error.userInfo;
                
            }else{
                
                NSError *_err = nil;
                id _rr = [NSJSONSerialization JSONObjectWithData:data
                                                         options:NSJSONReadingAllowFragments
                                                           error:&_err];
                if (_err) {
                    NSLog(@"Request_err:%@",_err.userInfo);
                    _r = error.userInfo;
                }
                else{
                    NSLog(@"Request_Info: %@",_r);
                    _iS = YES;
                    _r = @{ @"data": _rr?:@{} };
                }
                
            }
            
            if (callback) {
                callback(_iS,_r);
            }
            
        }];
        [_dataTask resume];

    }
    
}




@end
