#import "DeviceInfoModule.h"
#import <UIKit/UIKit.h>
#import <sys/utsname.h>

@implementation DeviceInfoModule

RCT_EXPORT_MODULE(DeviceInfoBridge);

RCT_EXPORT_METHOD(getDeviceInfo:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    struct utsname systemInfo;
    uname(&systemInfo);

    NSString *deviceModel = [NSString stringWithCString:systemInfo.machine
                                              encoding:NSUTF8StringEncoding];

    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    NSString *appVersion = infoDictionary[@"CFBundleShortVersionString"] ?: @"1.0.0";
    NSString *buildNumber = infoDictionary[@"CFBundleVersion"] ?: @"1";

    NSDictionary *deviceInfo = @{
      @"deviceName": [[UIDevice currentDevice] name],
      @"systemVersion": [NSString stringWithFormat:@"iOS %@", [[UIDevice currentDevice] systemVersion]],
      @"appVersion": appVersion,
      @"buildNumber": buildNumber,
      @"platform": @"ios",
      @"model": deviceModel
    };

    resolve(deviceInfo);
  } @catch (NSException *exception) {
    reject(@"DEVICE_INFO_ERROR", @"Failed to get device info", nil);
  }
}

RCT_EXPORT_METHOD(getSystemVersion:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *version = [NSString stringWithFormat:@"iOS %@",
                       [[UIDevice currentDevice] systemVersion]];
  resolve(version);
}

@end
