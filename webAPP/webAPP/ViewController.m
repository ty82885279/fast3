//
//  ViewController.m
//  webAPP
//
//  Created by Mr Lee on 2017/11/28.
//  Copyright © 2017年 Mr Lee. All rights reserved.
//

#import "ViewController.h"
#import "LLhtmlVc.h"


@interface ViewController ()


@end

@implementation ViewController

-(void)viewDidLayoutSubviews
{
    [super viewDidLayoutSubviews];
    
    LLhtmlVc *vc = [[LLhtmlVc alloc]init];
    
    [self presentViewController:vc animated:NO completion:nil];
    
    [NSURL URLWithString:@""];
    
}


@end
