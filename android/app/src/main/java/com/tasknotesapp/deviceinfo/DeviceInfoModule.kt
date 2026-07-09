package com.tasknotesapp.deviceinfo

import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableNativeMap

class DeviceInfoModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "DeviceInfoBridge"

    @ReactMethod
    fun getDeviceInfo(promise: Promise) {
        try {
            val map = WritableNativeMap()
            map.putString("deviceName", "${Build.MANUFACTURER} ${Build.MODEL}")
            map.putString("systemVersion", "Android ${Build.VERSION.RELEASE}")
            map.putString("appVersion", "1.0.0")
            map.putString("buildNumber", "1")
            map.putString("platform", "android")
            promise.resolve(map)
        } catch (e: Exception) {
            promise.reject("DEVICE_INFO_ERROR", "Failed to get device info", e)
        }
    }

    @ReactMethod
    fun getSystemVersion(promise: Promise) {
        promise.resolve("Android ${Build.VERSION.RELEASE} (API ${Build.VERSION.SDK_INT})")
    }
}
