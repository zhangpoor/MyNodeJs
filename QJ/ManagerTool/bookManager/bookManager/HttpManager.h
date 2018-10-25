//
//  HttpManager.h
//  bookManager
//
//  Created by zhangpoor on 2018/10/24.
//  Copyright © 2018年 zhangpoor. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef enum
{
    RequestTypePost,
    RequestTypeGet,
}RequestType;


@interface HttpManager : NSObject


+ (void)startRequest:(RequestType)tp
                 url:(NSString *)url
            jSonInfo:(NSDictionary *)info
            callback:(void(^)(BOOL isSuccess,NSDictionary *result))callback;


@end
