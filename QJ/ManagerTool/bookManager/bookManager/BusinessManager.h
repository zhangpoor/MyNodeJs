//
//  BusinessManager.h
//  bookManager
//
//  Created by zhangpoor on 2018/10/24.
//  Copyright © 2018年 zhangpoor. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef void(^Callback)(BOOL isSuccess,id info);



@interface BusinessManager : NSObject

+ (BusinessManager *)sharedInstance;

- (void)scanISBN:(NSString *)isbn
        callback:(Callback)callback;

- (void)addBook:(NSString *)isbn
       callback:(Callback)callback;

@end
