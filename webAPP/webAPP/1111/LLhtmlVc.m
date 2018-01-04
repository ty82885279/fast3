//
//  LLhtmlVc.m
//  webAPP
//
//  Created by MrLee on 2017/11/30.
//  Copyright © 2017年 Mr Lee. All rights reserved.
//

#import "LLhtmlVc.h"
#import <WebKit/WebKit.h>

@interface LLhtmlVc ()<WKNavigationDelegate>
@property(nonatomic,strong)WKWebView *webView;

@end

@implementation LLhtmlVc

- (void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
    [[UIApplication sharedApplication] setStatusBarHidden:YES];

}

- (void)viewWillDisappear:(BOOL)animated{
    [super viewWillDisappear:animated];
    [[UIApplication sharedApplication] setStatusBarHidden:NO];
   
}



-(void)viewDidLayoutSubviews
{
    [super viewDidLayoutSubviews];
    
    
    if([UIScreen mainScreen].bounds.size.height ==480){
        
         _webView = [[WKWebView alloc]initWithFrame:CGRectMake(0, 20, self.view.frame.size.width, self.view.frame.size.height)];
        
    }else{
        
        _webView = [[WKWebView alloc]initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height+20)];
    }
    
    
    _webView.navigationDelegate = self;
    
    NSBundle *bundle = [NSBundle mainBundle];
    
    NSURL *indexFileURL = [bundle URLForResource:@"index" withExtension:@"html"];
    //[self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"http://m15040563312.gitee.io/pc"]]];
    //http://m15040563312.gitee.io/car
//    [self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"http://m15040563312.gitee.io/point-kick-10/"]]];
    [self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"https://ty82885279.github.io/fast3/"]]];
    //[self.webView loadRequest:[NSURLRequest requestWithURL:indexFileURL]];
    
    self.webView.backgroundColor = [UIColor whiteColor];
    
    [self.view addSubview:_webView];
    
    self.view.backgroundColor = [UIColor whiteColor];
    
}

//-(BOOL)shouldAutorotate
//
//{
//
//    return NO;
//
//}
//-(UIInterfaceOrientationMask)supportedInterfaceOrientations
//
//{
//
//    return UIInterfaceOrientationMaskLandscape;
//
//}
//-(UIInterfaceOrientation)preferredInterfaceOrientationForPresentation
//
//{
//
//    return UIInterfaceOrientationLandscapeRight;
//
//}

@end
