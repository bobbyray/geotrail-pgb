﻿'use strict';
/* 
Copyright (c) 2015 - 2018 Robert R Schomburg
Licensed under terms of the MIT License, which is given at
https://github.com/bobbyray/MitLicense/releases/tag/v1.0
*/
// Object for settings for My Geo Trail saved/loaded by model.
function wigo_ws_GeoTrailSettings() {
    // Boolean indicating geo location tracking is allowed.
    this.bAllowGeoTracking = true;

    // Boolean indicating that navigator.geolocation.watchPosition(...) is used for tracking.
    // For false, a wakeup timer is used for tracking.
    // If this.bAllowGeoTracking is false, this property is ignored.
    this.bUseWatchPositionForTracking = true; 

    // Float for period for updating geo tracking location in seconds.
    this.secsGeoTrackingInterval = 3 * 60; // Initially default was 30;
    // Float for distance in meters for threshold beyond which nearest distance to path is 
    // considered to be off-path.
    this.mOffPathThres = 30;
    // Float for distance in meters from previous tracking geolocation for which
    // alert is issued if off trail.  
    this.mOffPathUpdate = 50; 
    // Boolean indicating geo location tracking is initially enabled.
    // Note: If this.bAllowGeoTracking is false, this.bEnableAbleTracking is ignored
    //       and tracking is not enabled.
    // Note 20161205: this.this.bEnableGeoTracking is no longer used.
    this.bEnableGeoTracking = false;
    // String whose value is english or metric to indicete units displayed for distances.
    // Note: Internally distances are in meters and converted to english or metric on display.
    this.distanceUnits = 'english'; 
    // Boolean to indicate phone alert is initially enabled.
    // Note: bOffPathAlert is misnamed. Still using the misleading name 
    //       so that localData storage key is not changed. 
    this.bOffPathAlert = true;
    // Boolean to indicate a phone alert (vibration) is given when off-path. 
    this.bPhoneAlert = true;
    // Float for number of seconds for phone to vibrate on an alert.
    this.secsPhoneVibe = 0.0;
    // Integer for number of beeps on an alert. 0 indicates no beep.
    this.countPhoneBeep = 1;
    // Distance in kilometers to issue periodic alert that specified distance interval 
    // has been travel when recording. 
    this.kmRecordDistancAlertInterval = 2.0 * 1.60934;  // 2.0 miles in kilometers. 
    // Distance in kilometers for distance goal per day for a recorded path.
    this.kmDistanceGoalPerDay = 2.0 * 1.60934;  // 2.0 miles in kilometers. 
    // Boolean to indicate excessive acceleration alert is enabled.
    this.bAccelAlert = false; 
    // Float for excessive acceleration threshold in m/sec^2.
    this.nAccelThres = 35.0;  
    // Float for excessive acceleration velocity in m/sec.
    this.nAccelVThres = 10.0; 
    // Boolean to indicate amination of a path is started automatically when a path is loaded. 
    this.bAutoPathAnimation = false;  
    // Boolean to indicate a Pebble watch alert (vibration) is given when off-path.
    this.bPebbleAlert = true;
    // Integer for number of times to vibrate Pebble on a Pebble alert. 0 indicates no vibration.
    this.countPebbleVibe = 1;
    // Float for distance in meters for threshold for minimum change in distance
    // for previous geolocation to be updated wrt to current geolocation.
    this.dPrevGeoLocThres =5.0; //20161205 was 40.0;
    // Float for velocity in meters/sec for velocity limit used in filtering spurious record points.
    this.vSpuriousVLimit = 5.0; 
    // Float for body mass in kilograms.
    this.kgBodyMass = 75.0; 
    // Float for converting kinetic Calories to burned calories, equals kinetic calories / burned calories.
    // Note: burned calories are calculated as follows: kinetic calories / this conversion factor.
    this.calorieConversionEfficiency = 0.10; 
    // Boolean to show topology layer on map.     
    this.bTopologyLayer = false;
    // Boolean to show snow cover layer on map.   
    this.bSnowCoverLayer = true; 
    // Boolean to indicate a mouse click (touch) simulates getting the geolocation
    // at the click point. For debug only.
    this.bClickForGeoLoc = false;
    // Boolean to indicate compass heading arrow is drawn on map.
    this.bCompassHeadingVisible = true; // 20160609 added.
    // ** 20151204 Settings added for home area rectangle.
    // Southwest corner of home area rectangle.
    this.gptHomeAreaSW = new wigo_ws_GeoPt();
    // NorthEastCorner of home areo rectangle.
    this.gptHomeAreaNE = new wigo_ws_GeoPt();
    // Initialize home area to Mount Hood National Forest.
    // This is the home area used if user has not saved one,
    // and is the ome area when app is initially installed.
    this.gptHomeAreaSW.lat = 45.02889163330814;
    this.gptHomeAreaSW.lon = -122.00729370117188;
    this.gptHomeAreaNE.lat = 45.622682153628226;
    this.gptHomeAreaNE.lon = -121.51290893554688;

    // Schema level (version) for this object.
    // Remarks:
    // Always constructed to 0. Set to schema level when object is persisted (saved to localStorage).
    this.nSchema = 0;  
    // ** 
}

// Object for version for My Geo Trail saved/loaded by model.
function wigo_ws_GeoTrailVersion() { // 20160610 added.
    // String for app version id saved in settings.
    // Note: Used to detect when app version has changed.
    this.sVersion = ""; 
    // Boolean to indicated Terms of Use has been accepted.
    this.bTermsOfUseAccepted = false; 
}

// Object for RecordStats Xfr with Server
function wigo_ws_RecordStatsXfrInfo() { 
    // number of milliseconds for timestamp of most recent stats item uploaded to server.
    this.nUploadTimeStamp = 0; // Note: No longer used. Any value is not meaningful.
    // Owner (user) id of  previously signed in user.
    this.sPreviousOwnerId = "";
    // Array for keeping track of deletions done locally that are yet to be transferred to sever.
    this.arDeleteId = [];  // array of id, ie nTimeStamp of wigo_ws_GeoTrailRecordStats, to delete. 
    // Array for keeping track of ids (timestamp) of wigo_ws_GeoTrailRecordStats that have been 
    // added or edited but not yet uploaded to server.
    this.arEditId = []; // element can be existing item to replace or an addition at the server.
    // Array for ids copied from arEditId to indicate the wigo_ws_GeoTrailRecordStats ojbs whose 
    // deletion at the server is in progress.
    this.arDeleteIdPending =  []; 
    // Array for of ids copied from arEditId to indicate the wigo_ws_GeoTrailRecordStats obj whose
    // upload to the server is in progress.
    this.arEditIdPending = []; 
}

// Object for element of array of residual RecordStats items than need to be 
// uploaded to web server for an owner id.
function wigo_ws_RecordStatsXfrResidue() { 
    this.sOwnerId = ""; // String for owner id.
    this.arRecStats = []; // Array of wigo_ws_GeoTrailRecordStats objects for sOwnerId that only have been edited locally.        
    this.arDeleteId = []; // Array of number. array of ids (timestamps) of wigo_ws_GeoTrailRecordStats objs that only have been deleted locally. 
}

// Object for the Model (data) used by html page.
// Model should be sharable by all html pages for GeoPaths site.
// However, Controller and View are different for each page.
function wigo_ws_Model(deviceDetails) {   
    // ** Public members

    // Puts gpx data to server.
    // Returns true for data transfer started; false if another transfer is already in progress. 
    // Uses aysnc callback onDone.
    // Args:
    //  gpx: wigo_ws_Gpx object to be stored at server.
    //  onDone: async callback on completion with this signature:
    //      bOk: boolean for success.
    //      sStatus: status string describing result.
    this.putGpx = function (gpx, onDone) {
        // Quit if internet access is not available.
        if (!CheckNetAccess(onDone)) {  
            return true; 
        }        
        var bOk = api.GpxPut(gpx, this.getAccessHandle(), onDone);
        return bOk;
    };

    // Deletes gpx data record from server.
    // Returns true for data transfer started; false if another transfer is already in progress. 
    // Uses aysnc callback onDone.
    // Args:
    //  gpxId: {sOwnerId, string, nId: integer}
    //      sOwner: owner id of record to delete.
    //      nId: unique record id of record to delete.
    //  onDone: async callback on completion with this signature:
    //      bOk: boolean for success.
    //      sStatus: status string describing result.
    this.deleteGpx = function (gpxId, onDone) {
        // Quit if internet access is not available.
        if (!CheckNetAccess(onDone)) {  
            return true; 
        }        
        var bOk = api.GpxDelete(gpxId, this.getAccessHandle(), onDone);
        return bOk;
    };

    // Gets list of gpx data objects from the server.
    // Returns true for data transfer started; false if another transfer is already started.
    // Uses async callback onDone.
    // Args:
    //  sOwnerId: string for owner id of Gpx data objecct.
    //  nShare: byte for enumeration of sharing mode for Gpx data object.
    //  onDone: async callback on completion with this signature:
    //      bOk: boolean indicating success.
    //      gpxList: array of wigo_ws_Gpx objects found in database.
    //      sStatus: string indicating result. (For bOk false, an error msg.)
    this.getGpxList = function (sOwnerId, nShare, onDone) {
        // Quit immediately if internet access is not available.
        if (!CheckNetAccessGetList(onDone)) { 
            return true;
        }
        var bOk = api.GpxGetList(sOwnerId, nShare, this.getAccessHandle(), onDone);
        return bOk;
    }

    // Gets list of gpx data objects from the server for paths within a geo rectangle.
    // Returns true for data transfer started; false if another transfer is already started.
    // Uses async callback onDone.
    // Args:
    //  sOwnerId: string for owner id of Gpx data objecct.
    //  nShare: byte for enumeration of sharing mode for Gpx data object.
    //  gptSW: wigo_ws_GeoPt object for SouthWest corner of rectangle.
    //  gptNE: wigo_ws_GeoPt object for NorthEast corner of rectangle.
    //  onDone: async callback on completion with this signature:
    //      bOk: boolean indicating success.
    //      gpxList: array of wigo_ws_Gpx objects found in database.
    //      sStatus: string indicating result. (For bOk false, an error msg.)
    this.getGpxListByLatLon = function (sOwnerId, nShare, gptSW, gptNE, onDone) {
        // Quit immediately if internet access is not available.
        if (!CheckNetAccessGetList(onDone)) { 
            return true;
        }
        var bOk = api.GpxGetListByLatLon(sOwnerId, nShare, gptSW, gptNE, this.getAccessHandle(), onDone);
        return bOk;
    };

    // Uploads recorded stats list to server.
    // Args:
    //  arStats: ref to array of wigo_ws_GeoTrailRecordStats objs. the list to upload.
    //  onDone: Asynchronous completion handler. Signature:
    //      bOk: boolean: true for sucessful upload.
    //      sStatus: string: description for the upload result.
    //      Returns: void
    //  Synchronous return: boolean. true indicates upload successfully started.
    // Remarks: User must be signed in. If user is not signed in, calls onDone(..) 
    // immediately indicating user is not signed in and returns false.
    this.uploadRecordStatsList = function (arStats, onDone) { 
        var ah = this.getAccessHandle();
        var id = this.getOwnerId();
        var bStarted = false;
        if (ah.length > 0 && id.length > 0) {
            bStarted = api.UploadRecordStatsList(id, ah, arStats, onDone);
        } else {
            // Can not upload because user id is invalid. 
            bStarted = false;  
            if (onDone) {
                onDone(false, "User must be signed in.");
            }
        }
        return bStarted;
    };

    // Deletes recorded stats list at server.
    // Args:
    //  arTimeStamp: ref to array of wigo_ws_GeoTrailTimeStamp objs. the list of timestamps identifying the record stats to delete.
    //               Note that array[i].nTimeStamp is the timestamp.
    //  onDone: Asynchronous completion handler. Signature:
    //      bOk: boolean: true for sucessful delete.
    //      sStatus: string: description for the delete result.
    //      Returns: void
    //  Synchronous return: boolean. true indicates delete successfully started.
    // Remarks: User must be signed in. If user is not signed in, calls onDone(..) 
    // immediately indicating user is not signed in and returns false.
    this.deleteRecordStatsList = function (arTimeStamp, onDone) { 
        var ah = this.getAccessHandle();
        var id = this.getOwnerId();
        var bStarted = false;
        if (ah.length > 0 && id.length > 0) {
            bStarted = api.DeleteRecordStatsList(id, ah, arTimeStamp, onDone);
        } else {
            // Can not delete at server because user id is invalid. 
            bStarted = false; 
            if (onDone) {
                onDone(false, "User must be signed in.");
            }
        }
        return bStarted;
    };

    // Downloads recorded stats list from server.
    // Args:
    //  onDone: Asynchronous completion handler. Signature:
    //      bOk: boolean: true for sucessful upload.
    //      arStats: array of wigo_ws_GeoTrailRecordStats objs. the list that has been downloaded.
    //      sStatus: string: description for the download result.
    //      Returns: void
    //  Synchronous return: boolean. true indicates download successfully started.
    // Remarks: User must be signed in. If user is not signed in, calls onDone(..) 
    // immediately indicating user is not signed in and returns false.
    this.downloadRecordStatsList = function (onDone) { 
        var ah = this.getAccessHandle();
        var id = this.getOwnerId();
        var bStarted = false;
        if (ah.length > 0 && id.length > 0) {
            bStarted = api.DownloadRecordStatsList(id, ah, onDone);
        } else {
            // Can not upload because user id is invalid. 
            bStarted = false;  
            if (onDone) {
                onDone(false, [], "User must be signed in.");
            }
        }
        return bStarted;
    }

    // Resets flag that indicates http request (get or post) is still in progress and
    // the busy flag for updating Record Stats at the server.
    // Note: May be needed if trying to issue subsequent requests fails due to 
    //       a previous request not completed. 
    this.resetRequest = function() { 
        api.ResetRequest();     
        geoTrailRecordStatsXfr.resetServerUpdatesBusy(); 
    };

    // Authenticates user with database server.
    // Returns true for request to server started, 
    //  false if another request is already in progress.
    // Args:
    //  accessToken: string for accessToken, which server uses to verify authentication.
    //  userID: string for unique user id.
    //  userName: string or user name.
    //  onDone: callback on async completion, Signature:
    //     errorResult: AuthResult object from api:  {status, accessHandle, msg}:
    //          errorResult.status: integer for status define by this.EAuthStatus().Error.
    //          error.msg: string describing the status.
    //          other fields of errorResult are defaults, empty strings.
    this.authenticate = function (accessToken, userID, userName, onDone) {
        var bNetOnline = networkInfo.isOnline();  
        var authData = { 'accessToken': accessToken, 'userID': userID, 'userName': userName };
        var bOk = api.Authenticate(authData, onDone, bNetOnline);  
        return bOk;
    };


    // Logouts (revokes authentication) for owner at the database server.
    // Args:
    //  onDone: callback on asynchronous completion, Signature:
    //      bOk: boolean indicating success.
    //      sMsg: string describing the result.
    // Returns boolean synchronously indicating successful post to database server.
    this.logout = function (onDone) {  
        // Quit if internet access is not available.
        if (!CheckNetAccess(onDone)) { 
            return true; 
        }        
        var logoutData = { 'accessHandle': this.getAccessHandle(), 'userID': this.getOwnerId() };
        var bOk = api.Logout(logoutData, onDone);
        return bOk;
    };

    // Returns true if there is an owner id and access handle.
    this.IsOwnerAccessValid = function () {
        var ah = this.getAccessHandle();
        var id = this.getOwnerId();
        var bOk = ah.length > 0 && id.length > 0;
        return bOk;
    };

    // Returns enumeration object for sharing mode of gpx data.
    // Returned obj: { public: 0, protected: 1, private: 2 }
    this.eShare = function () { return api.eShare(); };

    // Returns enumeration object authentication status received from database server.
    // See GeoPathsRESTful.eAuthStatus for enumeration.
    this.eAuthStatus = function () {
        return api.eAuthStatus();
    }

    // Returns ref to enumeration object for duplication of sName of Gpx object.
    this.eDuplicate = function () {
        return api.eDuplicate(); 
    };

    // Reads a text file.
    // Return true for reading stared, false for reading already in progress. 
    // Uses async callback when reading file has completed.
    // Args:
    //  file: object obtained from FileList for the input file control.
    //  onDone: callback when file text has been read. Handler Signature:
    //          bOk: boolean indicating success.
    //          sResult: result of reading the file.
    //              For bOk true, the string of text read.
    //              For bOk false, an error message.
    this.readTextFile = function (file, onDone) {
        if (bReadingFile)
            return false; // Reading a file already in progress.
        reader.onload = function (e) {
            bReadingFile = false;
            // this is reader object.
            if (onDone)
                onDone(true, this.result)
        };
        reader.onerror = function (e) {
            bReadingFile = false;
            var sError = "Failed to read file " + file.name + ".";
            if (onDone)
                onDone(false, sError);
        }
        bReadingFile = true;
        reader.readAsText(file);
    };


    // Parse a string of xml for Gpx data.
    // Returns wigo_ws_GpxPath obj for the path defined by the Gpx data.
    // wigo_ws_GpxPath.arGeoPt is empty if parsing fails.
    // Arg:
    //  xmlGpx: string of xml for the Gpx data.
    this.ParseGpxXml = function (xmlGpx) {
        var path = new wigo_ws_GpxPath();
        var bOk = path.Parse(xmlGpx);
        if (!bOk) {
            path.arGeoPt.length = 0;
        }
        return path;
    };


    // Returns OwnerId (aka user ID) string from localStorage.
    // Returns empty string if OwnerId does not exist.
    this.getOwnerId = function () {
        var sOwnerId;
        if (localStorage[sOwnerIdKey])
            sOwnerId = localStorage[sOwnerIdKey];
        else
            sOwnerId = "";
        return sOwnerId;
    }

    // Sets OwnerId (aka user ID) in localStorage.
    // Arg:
    //  sOwnerId: string for the OwnerId.
    this.setOwnerId = function (sOwnerId) {
        localStorage[sOwnerIdKey] = sOwnerId;
    }

    // Returns owner name string from localStorage.
    // Returns empty string if name does not exist.
    this.getOwnerName = function () {
        var sOwnerName;
        if (localStorage[sOwnerNameKey])
            sOwnerName = localStorage[sOwnerNameKey];
        else
            sOwnerName = "";
        return sOwnerName;
    };

    // Sets owner name in localStorage.
    // Arg:
    //  sOwnerName is string for the owner name.
    this.setOwnerName = function (sOwnerName) {
        localStorage[sOwnerNameKey] = sOwnerName;
    };

    // Returns access handle string from localStorage.
    // Returns empty string if access handle does not exist.
    this.getAccessHandle = function () {
        var sAccessHandle;
        if (localStorage[sAccessHandleKey])
            sAccessHandle = localStorage[sAccessHandleKey];
        else
            sAccessHandle = "";
        return sAccessHandle;
    };

    // Returns access handle from localStorage.
    // Arg:
    //  sAccessHandle is string for the access handle.
    this.setAccessHandle = function (sAccessHandle) {
        localStorage[sAccessHandleKey] = sAccessHandle;
    };

    // Sets offline params object for a trail map in local storage.
    // Args:
    //  oParams: wigo_ws_GeoPathMap.OfflineParams object for a geo path.
    //           oParams.nId is used to find an existing object in the array.
    //           For oParams.nId === 0, oParam.nId is converted to next
    //           least negative integer in the array of params so that a unique 
    //           params object is set.  The first negative id is -1.
    //           Note: A negative params.nId inicates the trail for the object 
    //                 has not been uploaded to the web server, but could be.
    //           On a match the oParams replaces the array element, otherwise 
    //           oParams is added to the array.
    this.setOfflineParams = function (oParams) {
        arOfflineParams.setId(oParams);
        arOfflineParams.SaveToLocalStorage();
    };

    // Replaces offline params object for a map in local storage.
    // Args:
    //  nId: number. id of offline path to replace.
    //  oParams: wigo_ws_GeoPathMap.OfflineParams object. The oject that replaces object identified by nId.
    // Note: If nId is not found in list of offline geo paths, the list is unchanged.
    this.replaceOfflineParams = function(nId, oParams) {
        var bReplaced = arOfflineParams.replaceId(nId, oParams);
        arOfflineParams.SaveToLocalStorage(); 
        return bReplaced;
    };

    // Deletes offline params object for a map in local storage.
    // Args:
    //  nId: number. id of offline path to replace.
    //               nId matches a member of wigo_ws_GeoPathMap.OfflineParams object in the list.
    //  oParams: wigo_ws_GeoPathMap.OfflineParams object. The oject that replaces object identified by nId.
    // Note: If nId is not found in list of offline geo paths, the list is unchanged.
    this.deleteOfflineParams = function(nId) { 
        var bDeleted = arOfflineParams.deleteId(nId);
        arOfflineParams.SaveToLocalStorage(); 
        return bDeleted;
    };

    // Returns wigo_ws_GeoPathMap.OfflineParameters object saved in local storage.
    // Return null if object is not found.
    // Arg:
    //  nId is record id of a wigo_ws_GeoMap.OfflineParams object (object for a geo path).
    //      nId is used to find the wigo_ws_GeoMap.OfflineParams object.
    this.getOfflineParams = function (nId) {
        var oParamsFound = arOfflineParams.findId(nId);
        return oParamsFound;
    };

    // Returns list, which is an Array object of wigo_ws_GeoPathMap.OfflineParams elements.
    this.getOfflineParamsList = function() {
        // Always reload from local storage. arOfflineParams.arParms may have been reset.
        // (Resetting arOfflineParams.arParms actually happened.)
        return arOfflineParams.getAll();
    };

    // Clears the list of offline parameters and saves the empty list to localStorage.
    this.clearOffLineParamsList = function () {
        arOfflineParams.Clear();
        arOfflineParams.SaveToLocalStorage();
    };

    // Clears record stats array in memory.
    // Note: Does not clear recorded stats in localStorage.
    this.clearRecordStats = function() { 
        arRecordStats.Clear();
    };
    
    // Sets record stats object in memory and in localStorage.
    // Arg:
    //  status: wigo_ws_GeoTrailRecordStats obj. The stats to save.
    this.setRecordStats = function(stats) { 
        arRecordStats.setId(stats);
    };

    // Sets the list of Record Stats items in memory and in localStorage.
    // Arg:
    //  arRecStats: array of wigo_ws_GeoTrailRecordStats obj. The list to set in memory and localStorage.
    this.setRecordStatsList = function(arRecStats) { 
        arRecordStats.setList(arRecStats);
    }

    // Returns list of record stats objects, which is
    // array object of wigo_ws_GeoTrailRecordStats objects.
    this.getRecordStatsList = function() { 
        return arRecordStats.getAll();
    };

    // Returns ref to object that contains list of record stats objects.
    // Returns: ref to RecordStatsAry object, which contains array of 
    // wigo_ws_GeoTrailRecordStats objs and members to access the array.
    this.getRecordStatsAry = function() { 
        return arRecordStats;
    };

    // Deletes elements from record stats array and saves to localStorage.
    // Arg:
    //  arEl: {keyi: nTimeStamp, ...}. Object (not array). List specifying elements to delete.
    //      keyi: object property name. ith timestamp in the list.
    //      nTimeStamp: number. Timestamp in milliseconds, which is unique, for element to delete.
    this.deleteRecordStats = function(arEl) { 
        arRecordStats.DeleteEls(arEl);
    };

    // Returns ref to last wigo_ws_GeoTrailRecordStats in this array.
    this.getLastRecordStats = function() {
        return arRecordStats.getLast();
    };

    // Returns ref to wigo_ws_GeoTrailRecordStats in this array specified by a timestamp.
    // Returns null if not found.
    // Arg:
    //  nTimeStamp: number. timestamp in milliseconds to find.
    this.getRecordStats = function(nTimeStamp) { 
        return arRecordStats.getId(nTimeStamp);
    };

    // Returns ref to RecordStatsXfr obj. 
    // See function RecordStatsXfr for details. 
    this.getRecordStatsXfr = function() { 
        return geoTrailRecordStatsXfr;
    };

    // Sets settings in localStorage.
    // Arg:
    //  settings: wigo_ws_GeoTrailSettings object for the settings.
    this.setSettings = function (settings) {
        geoTrailSettings.SaveToLocalStorage(settings);
    };

    // Returns current settings, a wigo_ws_GeoTrailSettings object.
    this.getSettings = function () {
        return geoTrailSettings.getSettings();
    };

    // Sets version in localStorage.
    this.setVersion = function(version) {
        geoTrailVersion.SaveToLocalStorage(version);
    };

    // Returns current version, a wigo_ws_GeoTrailVersion object.
    this.getVersion = function() {
        return geoTrailVersion.getVersion();
    };

    // ** Private members
    var sOwnerIdKey = "GeoPathsOwnerId";
    var sAccessHandleKey = "GeoPathsAccessHandleKey";
    var sOwnerNameKey = "GeoPathsOwnerNameKey";

    var sOfflineParamsKey = 'GeoPathsOfflineParamsKey';
    var sGeoTrailSettingsKey = 'GeoTrailSettingsKey'; 
    var sGeoTrailVersionKey = 'GeoTrailVersionKey'; 
    var sRecordStatsKey = 'GeoTrailRecordStatsKey';  
    var sRecordStatsSchemaKey = 'GeoTrailRecordStatsSchemaKey';  
    var sRecordStatsXfrInfoKey = 'GeoTrailRecordStatsXfrInfoKey'; 
    var sRecordStatsXfrResidueKey = 'GeoTrailRecordStatsXfrResidueKey'; 

    var api = new wigo_ws_GeoPathsRESTfulApi(); // Api for data exchange with server.

    var bReadingFile = false;
    var reader = new FileReader(); // Text file reader.

    // Helper to check if internet access is available.
    // Returns true if internet access is available.
    // Arg:
    //  onDone: callback function(bOk, gpxList, sStatus).
    //      Called only if internet access is NOT available.
    //      bOk: boolean. false indicating failure.
    //      gpxList:  array of wigo_ws_Gpx objects. empty array.
    //      sStatus: string. status indicating internet access is not available.
    function CheckNetAccessGetList(onDone) {
        var bOk = true;
        if (!networkInfo.isOnline()) {
            bOk = false;
            if (typeof(onDone) === 'function' ) {
                onDone(bOk, [], "Internet access is not available.");
            }
        }
        return bOk;
    }

    // Helper to check if internet access is available.
    // Returns true if internet access is available.
    // Arg:
    //  onDone: callback function(bOk, gpxList, sStatus).
    //      Called only if internet access is NOT available.
    //      bOk: boolean. false indicating failure.
    //      sStatus: string. status indicating internet access is not available.
    function CheckNetAccess(onDone) {
        var bOk = true;
        if (!networkInfo.isOnline()) { 
            bOk = false;
            if (typeof(onDone) === 'function' ) {
                onDone(bOk, "Internet access is not available.");
            }
        }
        return bOk;
    }

    // Object for storing Offline Parameters for geo paths in local storage.
    // Manages an array of wigo_ws_GeoPathMap.OfflineParams objects.
    function OfflineParamsAry() {
        // Searches for element in this array.
        // Returns wigo_ws_GeoPathMap.OfflineParams object of the element found, or null for no match.
        // Arg:
        //  nId: integer for unique record id of Gpx element in this array.
        this.findId = function (nId) {
            var oFound = null;
            var iFound = this.findIxOfId(nId);
            if (iFound >= 0)
                oFound = arParams[iFound];
            return oFound;

        }

        // Searches for element in this array.
        // Returns index in the array at which the element was found, or -1 for no match.
        // Arg:
        //  nId: integer for unique record id of Gpx element in this array.
        this.findIxOfId = function (nId) {
            var iFound = -1;
            for (var i = 0; i >= 0 && i < arParams.length; i++) {
                if (arParams[i].nId === nId) {
                    iFound = i;
                    break;
                }
            }
            return iFound;
        };

        // Sets an element of this array to oParams.
        // If element already exits based on oParams.nId, the element is replaced.
        // Otherwise the element is added.
        // Arg:
        //  oParams: a wigo_ws_GeoPathMap.OfflineParams object.
        //           oParams.nId: integer. Has a special case as follows:
        //              === 0:  Indicates new object to add to the array. 
        //                      Find min nId in array: 
        //                          For min nId negative, convert oParams.nId to 1 less
        //                          For min nId >= 0, convert oParams.nId to -1.
        //                      Negative oParams.nId is used to indicate a data object
        //                      that could be uploaded to server, but has not been.
        //                      The negative nId's need to be unique.
        //                      Note: For first oParams.nId of 0 added, oParams.nId is converted to -1.
        //              otherwise: Replace existing oParams object or add a new one if no match.
        this.setId = function(oParams) {
            var iFound = 0;
            if(oParams.nId === 0) {
                // Add new oParams object.
                // Use least negative oParams.nId, or -1 if no existing negative nId.
                var nIdMin = FindnIdMin();
                oParams.nId = nIdMin < 0 ? nIdMin - 1 : -1;
            } 
            iFound = this.findIxOfId(oParams.nId)
            if (iFound >= 0) {
                arParams[iFound] = oParams;
            } else {
                arParams.push(oParams);
            }
        };

        // Replaces an element of this array with oParams.
        // If element is not found, there is no change.
        // Return true if element is found, false otherwise.
        // Arg:
        //  nId: number. id of the path for element for element to replace.        
        //  oParams: a wigo_ws_GeoPathMap.OfflineParams object. The replacement object.
        this.replaceId = function(nId, oParams) { 
            var iFound = this.findIxOfId(nId);
            if (iFound >= 0) {
                arParams[iFound] = oParams;
            }
            var bReplaced = iFound >= 0;
            return bReplaced;
        };

        // Deletes an element of this array.
        // If element is not found, there is no change.
        // Return true if element is found, false otherwise.
        // Arg:
        //  nId: number. id of the path for element for element to replace.        
        //       nId matches nId member of a wigo_ws_GeoPathMap.OfflineParams object in the path list.
        this.deleteId = function(nId, oParams) { 
            var iFound = this.findIxOfId(nId);
            if (iFound >= 0) {
                // Delete the element found.
                arParams.splice(iFound, 1); 
            }
            var bDeleted = iFound >= 0;
            return bDeleted;
        };

        // Returns an Array of all the wigo_ws_GeoPathMap.OfflineParams elements.
        this.getAll = function () {
            return arParams;
        };
        
        // Removes all elements of this array.
        this.Clear = function () {
            var nCount = arParams.length;
            for (var i = 0; i < nCount; i++) {
                arParams.pop();
            }
        };

        // Returns number of elements in this array.
        this.Count = function () {
            return arParams.length;
        }

        // Loads this object from local storage.
        this.LoadFromLocalStorage = function () {
            var sParams = localStorage[sOfflineParamsKey];
            if (sParams !== undefined)
                arParams = JSON.parse(sParams);
            
            var gpxPathLS, oParam;
            for (var i = 0; i < arParams.length; i++) {
                oParam = arParams[i];
                // Attach functions to the restored gpxPath object because
                // the functions are lost when saved to local storage.
                gpxPathLS = oParam.gpxPath;
                if (gpxPathLS)
                    wigo_ws_GpxPath.AttachFcns(gpxPathLS);
            }
        };
        // Saves this object to local storage.
        this.SaveToLocalStorage = function () {
            localStorage[sOfflineParamsKey] = JSON.stringify(arParams);
        }
        
        // Returns minium nId found in the array.
        // Returns 0 if array is empty.
        function FindnIdMin() { 
            var nIdMin = 0;
            for (var i = 0; i >= 0 && i < arParams.length; i++) {
                if (i === 0) {
                    nIdMin = arParams[0].nId;
                } else if (arParams[i].nId < nIdMin) {
                    nIdMin = arParams[i].nId;
                }
            }
            return nIdMin;
        }
        var arParams = new Array(); // Array of wigo_ws_GeoPathMap.OfflineParams.

        this.LoadFromLocalStorage();
    }
    // Array of offline parameters for geo paths.
    var arOfflineParams = new OfflineParamsAry();

    // Object for storing an array of wigo_ws_GeoTrailRecordStats objects.
    // Note: Construction loads this object from localStorage.
    function RecordStatsAry() { 
        // Sets a record stats element in this array and saves array to localStorage. 
        // Arg: 
        //  stats wigo_ws_GeoTrailRecordStats. stats element to set.
        //        stats.nTimeStamp is the unique id for the element.
        //        If stats.nTimeStamp matches an existing element, the
        //        element is replaced; otherwise it is added.
        this.setId = function(stats) {  
            var iAt = FindIxOfId(stats.nTimeStamp);
            if (iAt < 0) {
                // stats is not in the array. Insert stats into arRecordStats.
                InsertMissingAtNegi(iAt, stats);
            } else {      
                // stats found in array. replace existing element.
                arRecordStats[iAt] = stats;
            }

            this.SaveToLocalStorage();    
        };

        // Inserts stats only iif it is not in the array.
        // Does NOT save the array to localStorage.
        // Arg:
        //  stats wigo_ws_GeoTrailRecordStats. stats element to insert.
        //        stats.nTimeStamp is the unique id for the element.
        // Returns: boolean. true if stats is inserted (ie missing).
        this.insertMissingNoSave = function(stats) { 
            let bInserted = false;
            let iAt = FindIxOfId(stats.nTimeStamp);
            if (iAt < 0) {
                InsertMissingAtNegi(iAt, stats);
                bInserted = true;               
            }
            return bInserted;
        };

        // Sets this array to list of record stats elements and saves to localStorage.
        // Arg:
        //  arRecStats: array of wigo_ws_GeoTrailRecordStats objs. the list to assign to this array.
        this.setList = function(arRecStats) { 
            // Assign the arRecStats to this array without changing ref to this array.
            arRecordStats.splice(0); // Empty this array without changing ref.
            for (var i=0; i < arRecStats.length; i++) {
                arRecordStats.push(arRecStats[i]);
            } 
            this.SaveToLocalStorage(); 
        };

        // Returns ref to record stats obj specified by a timestamp.
        // Returns: wigo_ws_GeoTrailRecordStats ref or null if not found.
        // Arg:
        //  nTimeStamp: number. timestamp in milliseconds to find.
        this.getId = function(nTimeStamp) {
            var recStats = null;
            var iAt = FindIxOfId(nTimeStamp);
            if (iAt >= 0) {
                recStats = arRecordStats[iAt];
            }
            return recStats;
        };

        // Returns ref to array of all the wigo_ws_GeoTrailRecordStats objects.
        this.getAll = function() {
            return arRecordStats;
        };

        // Returns ref to last wigo_ws_GeoTrailRecordStats object in array.
        // Returns null if there is no last element.
        this.getLast = function() {
            var iLast = arRecordStats.length-1;
            var last = iLast >= 0 ? arRecordStats[iLast] : null;
            return last;
        };

        // Clears this array.
        this.Clear = function() {  
            arRecordStats.splice(0);
        };

        // Loads this object from local storage.
        this.LoadFromLocalStorage = function () {
            // Get schema for arRecordStats from localStorage.
            if (localStorage && localStorage[sRecordStatsSchemaKey]) {
                schema = JSON.parse(localStorage[sRecordStatsSchemaKey]);
            } else {
                schema.level = 0;
            }

            var sRecordStats = localStorage[sRecordStatsKey];
            if (sRecordStats !== undefined) {
                arRecordStats = JSON.parse(sRecordStats);
                // Check for updating schema.
                if (schema.level < nSchemaSaved) {
                    // Change for scheme.level 1.
                    if (schema.level < 1)
                        UpdateSchemaTo1();

                    // ** Changes for next schema.level x goes here.
                    // **** BE SURE to set nSchemaSaved below to x. 
                    this.SaveToLocalStorage();
                }
            } else {
                arRecordStats = [];
            }
        };
        // Schema number for arRecordStats when saving settings.
        // Increase nSchemaSaved when updating property of elements of arRecordStats.
        var nSchemaSaved = 1;  // Must be set to new number when nSchema change is added. 
        var schema = { level: 0 }; // Current schema leval.
        
        // Refactored helper to share saving stats at a negative index
        // return by FindIx(). 
        function InsertMissingAtNegi(iAt, stats) { 
            if (iAt >= 0)
                return; 
            if (iAt >= -arRecordStats.length) {
                // Convert negative insertion point to positive index.
                // Insertion point is iAt + arRecordStats.length.
                iAt += arRecordStats.length;
                arRecordStats.splice(iAt, 0, stats);
            }
            else {
                // Note: Here iAt should be == -arRecordStats.length - 1.
                // Insertion point is at top of array.
                arRecordStats.push(stats);
            }
        }

        // Update each element of arRecords. Each element is a wigo_ws_GeoTrailRecordStats obj:
        //      add property nModifiedTimeStamp.
        //      remove property caloriesBurnedActual.
        function UpdateSchemaTo1() {
            var statsEl;
            for (var i = 0; i < arRecordStats.length; i++) {
                statsEl = arRecordStats[i];
                // Ensure there is no nModifiedTimeStamp property.
                if ((typeof (statsEl.nModifiedTimeStamp) !== 'undefined')) {
                    delete statsEl.nModifiedTimeStamp;
                }
                // Remove caloriesBurnedActual if it exists.
                if (typeof (statsEl.caloriesBurnedActual) !== 'undefined') {
                    delete statsEl.caloriesBurnedActual;
                }
            }
        }

        // Deletes elements (wigo_ws_GeoTrailRecordStats objs) from the array.
        // Saves updated array to localStorage.
        // Arg:
        //  arEl: {keyi: nTimeStamp, ...}. Object (not array). List specifying elements to delete.
        //      keyi: object property name. key for ith element.
        //      nTimeStamp: number. Timestamp in milliseconds, which is unique, for element to delete.
        this.DeleteEls = function(arEl) { 
            let bChanged = false;
            let ix = -1;
            let arKey = Object.keys(arEl);
            for (let i=0; i < arKey.length; i++) {
                ix = FindIxOfId(arEl[arKey[i]]);
                if (ix >= 0) {
                    arRecordStats.splice(ix, 1); // Delete element at ix.
                    bChanged = true;
                }
            }
            if (bChanged) {
                this.SaveToLocalStorage();
            }
        }

        // Saves this object to local storage.
        this.SaveToLocalStorage = function() {
            localStorage[sRecordStatsKey] = JSON.stringify(arRecordStats);
            schema.level = nSchemaSaved;   
            localStorage[sRecordStatsSchemaKey] = JSON.stringify(schema);
        };

        // Searches for record stats. Search is efficent based on assumption that array
        // is in ascending order of element timestaps.
        // Returns integer. an index that aids in keeping the array in ascending order.
        //      index for index of element if found, or < 0 if not found.
        //      For index >= 0, elment was found at index.
        //      For index < 0 && index >= - Length_of_array, indicates element is not found
        //          and insertion (splicng) index for ascending order = index + Length_ of_array.
        //      For index == -Length_of_array - 1, element was not found and insertion index = Length_of_array,
        //          i.e, the end (aka top) of the array. Can push element to keep ascending order.
        // Arg:
        //  nTimeStamp: number. nTimeStamp id of element to match.
        function FindIxOfId(nTimeStamp) {  
            var el; // element i for looping thru array.
            // Default to index not found and nTimeStamp < el[0].nTimeStamp.
            // The default insertion point is for el[0], which causes existing el[0] to raise. 
            var iFound = arRecordStats.length > 0 ?  -arRecordStats.length : -1; 
            // Search thru array from top (most recent timestam) to botton (least recent timestamp).
            for (var i=arRecordStats.length - 1; i >= 0; i--) {
                el = arRecordStats[i];
                if (nTimeStamp === el.nTimeStamp) {
                    iFound = i; // Found the element at index i.
                    break;
                } if (nTimeStamp > el.nTimeStamp) {
                    // nTimeStamp is for insertion point at previous index
                    // because nTimeStamp is < timestamp of previous element. 
                    // Insertion point for ascending order is index of previous element.
                    if (i === arRecordStats.length - 1) {
                        // index for insertion at top of array.
                        // Note: If searching for a recently created element, this is the likely case
                        //       because an element is created as time increases.
                        iFound =  -arRecordStats.length - 1; 
                    } else {
                        // Insertion point at an index in the array.
                        iFound = i + 1 - arRecordStats.length; 
                    }
                    break;
                }
            }
            return iFound;
        }


        var arRecordStats = []; // Array of wigo_ws_GeoTrailRecordStats objects.

        this.LoadFromLocalStorage();
    }
    var arRecordStats = new RecordStatsAry();  

    // Object for an array of wigo_ws_GeoTrailRecordStats objects obtained from web server.
    // Note: Same as RecordStatsAry() object, except neither saves nor loads from localStorage.
    function RecordStatsAryServer() { 
        // Over-rides saving this object to local storage.
        // Does nothing. Does NOT save to local storage
        this.SaveToLocalStorage = function () {
            // localStorage[sOfflineParamsKey] = JSON.stringify(arParams);
            // DO NOT save to local storage
        };

        // Over-rides loading this object from local storage.
        // Does nothing.
        this.LoadFromLocalStorage = function () {
            // Do NOT load from localStorage.
        };
    }
    RecordStatsAryServer.prototype = new RecordStatsAry();
    RecordStatsAryServer.constructor = RecordStatsAryServer;


    // Object for the Geo Trail Settings persisted to localStorage.
    function GeoTrailSettings() {
        // Returns the current settings, a wigo_ws_GeoTrailSettings object.
        // Note: The current settings are the same as those in localStorage.
        //       However, for efficiency localStorage is only loaded 
        //       during construction and this.SaveToLocalStorage(settings)
        //       updates the local settings var and saves to localStorage.
        this.getSettings = function () {
            return settings;
        };

        // Saves settings for My Geo Trail to local storage.
        // Arg
        //  oSettings: wigo_ws_GeoTrailSettings object giving the settings.
        // Remarks:
        // The local var nSchemaSaved is assigned by this.SaveToLocalStorage() to the nSchema property of settings
        // so that nSchema is correct when saved.
        this.SaveToLocalStorage = function (oSettings) {
            settings = oSettings; // Save to local var.
            settings.nSchema = nSchemaSaved;
            if (localStorage)
                localStorage[sGeoTrailSettingsKey] = JSON.stringify(settings);
        };

        // Loads this object from local storage. 
        // Remarks:
        // The defaults for the underlying wigo_ws_GeoTrailSettings object can be changed
        // for a new release of code. The property nSchema of wigo_ws_GeoTrailSettings
        // provides a way to determine if defaults for settings are updated for a new release.
        // If defaults need to be updated when loading from local storage, the updates 
        // are applied and then saved to local storage.
        // The local var nSchemaSaved is assigned by this.SaveToLocalStorage() to the nSchema property of settings.
        // var nSchemaSaved needs to be incremented when defaults for a new release are changed.
        this.LoadFromLocalStorage = function() {
            if (localStorage && localStorage[sGeoTrailSettingsKey]) {
                settings = JSON.parse(localStorage[sGeoTrailSettingsKey]);
                if (typeof(settings.nSchema) === 'undefined')
                    settings.nSchema = 0;
            } else {
                    settings.nSchema = 0;
            }
            
            // If settings loaded from localStorage is downlevel, update and save it.
            if (settings.nSchema < nSchemaSaved) {
                // ** changes for nSchema 1
                UpdateIfNeeded('secsPhoneVibe', 1, 0.0);
                UpdateIfNeeded('countPhoneBeep', 1, 1);
                UpdateIfNeeded('countPebbleVibe', 1, 1);
                UpdateIfNeeded('bPebbleAlert', 1, false);
                //20151294 Members added for home area rectangle.
                // Default to area around Oregon.
                var gptHomeAreaSW = new wigo_ws_GeoPt();
                gptHomeAreaSW.lat = 38.03078569382296;
                gptHomeAreaSW.lon = -123.8818359375;
                UpdateIfNeeded('gptHomeAreaSW', 1, gptHomeAreaSW);
                var gptHomeAreaNE = new wigo_ws_GeoPt();
                gptHomeAreaNE.lat = 47.88688085106898;
                gptHomeAreaNE.lon = -115.97167968750001;
                UpdateIfNeeded('gptHomeAreaNE', 1, gptHomeAreaNE);
                // member added for compass heading visible on map.
                UpdateIfNeeded('bCompassHeadingVisible', 1, true);
                // **

                // ** Changes for nSchema 2.
                // Check for new members of GeoTrailSettings that could be missing from old data.
                UpdateIfNeeded('dPrevGeoLocThres', 2, 5.0);  // Was 40 meters.
                //12052016 settings.bEnableGeoTracking is no longer used. Ensure set to false for safety.
                UpdateIfNeeded('bEnableGeoTracking', 2, false);
                //20161119 added member settings.mOffPathUpdate
                UpdateIfNeeded('mOffPathUpdate', 2, 50);
                //20161121 added member settings.bUseWatchPositionForTracking,
                UpdateIfNeeded('bUseWatchPositionForTracking', 2, true);
                //20161203 added member settings.distanceUnits 
                UpdateIfNeeded('distanceUnits', 2, 'english');
                // **

                // ** Changes for nSchema 3.
                // 20170216 Added setting.vSpuriousVLimit
                UpdateIfNeeded('vSpuriousVLimit', 3, 5.0); 
                // 20170223 Added setting.kgBodyMass.
                UpdateIfNeeded('kgBodyMass', 3, 75.0)
                // ** 

                // ** Changes for nSchema 4.
                // 20170501 added setting.calorieConversionEfficiency
                UpdateIfNeeded('calorieConversionEfficiency', 4, 0.10); 
                // **

                // ** Changes for nSchema 5.  
                UpdateIfNeeded('kmRecordDistancAlertInterval', 5, 2.0*1.60934);
                UpdateIfNeeded('bAutoPathAnimation', 5, false);

                // ** Changes for nSchema 6. 
                UpdateIfNeeded('bAccelAlert', 6, false); 
                UpdateIfNeeded('nAccelThres', 6, 35.0);
                UpdateIfNeeded('nAccelVThres', 6, 10.0);

                // ** Changes for nSchema 7. 
                UpdateIfNeeded('bTopologyLayer', 7, false);
                UpdateIfNeeded('bSnowCoverLayer', 7, true); 

                // ** Changes for nSchema 8. 
                UpdateIfNeeded('kmDistanceGoalPerDay', 8, 2.0 * 1.60934); 

                // ** Changes for next nSchema x goes here.
                // **** BE SURE to set nSchemaSaved below to x. 
                
                this.SaveToLocalStorage(settings);
            }
            return settings;
        };
        // Schema number for settings.nSchema when saving settings.
        // Increase nSchemaSaved when adding new settings property or 
        // changing default for a settings property. 
        var nSchemaSaved = 8;  // Must be set to new number when nSchema change is added.

        var settings = new wigo_ws_GeoTrailSettings(); // Local var of settings.

        // Updates settings if settings.nSchema is down level.
        // Args:
        //  propertyName: string. Name of property to update in settings.
        //  nSchema: integer. property is updated if nSchema > settings.nSchema.
        //  value: any type. value assigned to property if updated.
        function UpdateIfNeeded(propertyName, nSchema, value) { 
            if (typeof(settings[propertyName]) === 'undefined') {
                settings[propertyName] = value;
            } else if (nSchema > settings.nSchema) {
                settings[propertyName] = value;
            }
        }

    }
    
    // Object for GeoTrail Version saved in localStorage.
    function GeoTrailVersion() {
        // Returns the current version, a wigo_ws_GeoTrailVersion object.
        // Note: The current version is the same as in localStorage.
        //       However, for efficiency localStorage is only loaded 
        //       during construction and this.SaveToLocalStorage(version)
        //       updates the local version var and saves to localStorage.
        this.getVersion = function () {
            return version;
        };
        
        // Loads this object from local storage. 
        this.LoadFromLocalStorage = function() {
            if (localStorage && localStorage[sGeoTrailVersionKey]) {
                version = JSON.parse(localStorage[sGeoTrailVersionKey]);
            }
            return version;
        }

        // Saves version for GeoTrail to local storage.
        // Arg
        //  oVersion: wigo_ws_GeoTrailVersion object for the version.
        this.SaveToLocalStorage = function (oVersion) {
            version = oVersion; // Save to local var.
            if (localStorage)
                localStorage[sGeoTrailVersionKey] = JSON.stringify(oVersion);
        };
        var version = new wigo_ws_GeoTrailVersion();

    }

    // Object for RecordStatsXfr info and residue saved in localStorage.
    // When a new record stats item is formed, it can be uploaded to server.
    // The timestamp of most recent record stats item is saved in order to
    // to only upload items more recent than the previous upload.
    // When an owner (user) logs out, there may be a residue of 
    // wigo_ws_GeoTrailRecordStats objs that have not been upload to the server.
    // This object saves the residue for an owner, so that when the owner signs
    // in again, the residue can be uploaded. Normally wigo_ws_GeoTrailRecordStats
    // objs are uploaded to the server when switching to Stats History View.
    // Constructor arg:
    //  model: ref to wigo_ws_Model, the outer object.
    function RecordStatsXfr(model) { 
        // Adds to the edit list of timestamps (ids) of wigo_ws_GeoTrailRecordStats objs that need to be uploaded to server.
        // The list is updated and saved to localStorage.
        // Arg:
        //  nTimestamp: number. nTimestamp of wigo_ws_GeoTrailRecordStats obj to add.
        // Returns: nothing.
        // Remarks: 
        //   There is an edit list of ids for stats items. An item in the edit list can be a new item
        //   or a replacement of an existing item. There is no distinction between new or replacement.
        //   The server replaces a record for an existing id, or creates a new record if one dones not exist.
        //   There is also delete list of ids for stats items. If nTimeStamp for the edit is in the delete list,
        //   nTimeStamp is removed from the delete list. 
        this.addUploadEditTimeStamp = function(nTimeStamp) {
            AddInDescendingOrder(recordStatsXfrInfo.arEditId, nTimeStamp);
            RemoveGivenDescendingList(recordStatsXfrInfo.arDeleteId, nTimeStamp);
            SaveInfoToLocalStorage();
        };

        // Adds to the delete list of timestamps (ids) of wigo_ws_GeoTrailRecordStats objs that need to be deleted at server.
        // The list is updated and saved to localStorage.
        // Arg:
        //  nTimestamp: number. nTimestamp of wigo_ws_GeoTrailRecordStats obj to add.
        // Returns: nothing.
        // Remarks: 
        //   In addition to the delete list, there is an edit list.
        //   If nTimeStamp for the delete is in the edit list,
        //   nTimeStamp is removed from the edit list.
        //   Also, it is not an error for the server to try to delete a record for which nTimeStamp
        //   does not exist, in which case the server considers the record already deleted.
        this.addUploadDeleteTimeStamp = function(nTimeStamp) {
            AddInDescendingOrder(recordStatsXfrInfo.arDeleteId, nTimeStamp);
            RemoveGivenDescendingList(recordStatsXfrInfo.arEditId, nTimeStamp);
            SaveInfoToLocalStorage();
        };

        
        // Adds to the delete list of timestamps (ids) of wigo_ws_GeoTrailRecordStats objs that need to be deleted at server.
        // Arg:
        //  arGeoTrailTimestamp: array of wigo_ws_GeoTrailTimeStamp objs with the timestamps to add.
        //                       Note that arGeoTrailTimestamp[i].nTimeStamp is the timestamp.
        // Remarks:
        //  See remarks for this.addUploadDeleteTimeStamp function above.
        this.addUploadDeleteGeoTrailTimeStampList = function(arGeoTrailTimeStamp) { 
            for (let i=0; i < arGeoTrailTimeStamp.length; i++) {
                AddInDescendingOrder(recordStatsXfrInfo.arDeleteId, arGeoTrailTimeStamp[i].nTimeStamp);
                RemoveGivenDescendingList(recordStatsXfrInfo.arEditId, arGeoTrailTimeStamp[i].nTimeStamp);
            }
            if (arGeoTrailTimeStamp.length > 0) {
                SaveInfoToLocalStorage();
            }
        }; 


        // Helper for adding nId to an array of number. An addition
        // keeps the list in descending order with [0] being largest number (most recent timestamp).
        // Args:
        //  ar: array to which which to add nId.
        //  nId: number added to ar. if nId is already in the list, it not added again.
        function AddInDescendingOrder(ar, nId) {
            let bDone = false;
            for (let i = 0; i < ar.length; i++) {
                if (nId > ar[i]) {
                    // add nId at element 0.
                    ar.splice(i, 0, nId);
                    bDone = true;
                    break;
                } else if (nId === ar[i]) {
                    // nId is already in the list. nothing to do.
                    bDone = true;
                    break;
                }
            }
            if (!bDone) {
                // nId is least number so add it to end of the list.
                ar.push(nId); 
            }
        }

        
        // Helper for adding wigo_ws_GeoTrailRecordStats obj  to an array. An addition
        // keeps the list in descending order with [0] being largest timestamp (most recent timestamp).
        // if addition is already in the list, replaces existing element with the addition.
        // Args:
        //  ar: array of wigo_ws_GeoTrailRecordStats to which which to add an obj.
        //  el: wigo_ws_GeoTrailRecordStats obj. if el is already in the list, it not added again.
        function AddRecStatsInDescendingOrder(ar, el) {  
            let bDone = false;
            for (let i = 0; i < ar.length; i++) {
                if (el.nTimeStamp > ar[i].nTimeStamp) {
                    // add nId at element 0.
                    ar.splice(i, 0, el);
                    bDone = true;
                    break;
                } else if (el.nTimeStamp === ar[i].nTimeStamp) {
                    // nId is already in the list. Replace existing element.
                    ar[i] = el;
                    bDone = true;
                    break;
                }
            }
            if (!bDone) {
                // nId is least number so add it to end of the list.
                ar.push(el); 
            }
        }


        // Helper for removing nId from an array that is in descending order with element[0] being largest number.
        // If nId is not in the array, does nothing.
        //  ar: array of number in descending order, element [0] is largest number.
        //  nId: number. id (timestamp) to remove.
        function RemoveGivenDescendingList(ar, nId) {
            for (let i=0; i < ar.length; i++) {
                if (nId > ar[i]) {
                    // nId cannot be in list that is in descending order, so quit looking.
                    break;
                } else if (nId === ar[i]) {
                    // Found nId so delete it from the list.
                    ar.splice(i,1);
                    break;
                }
            }
        }


        // Helper for removing nId from an array of wigo_ws_GeoTrailRecordStats objs 
        // that is in descending order with element[0].nTimeStamp being largest number.
        // If nId is not in the array, does nothing.
        //  ar: array of wigo_ws_GeoTrailRecordStats obj in descending order, element [0].nTimeStamp is largest number.
        //  nId: number. id (timestamp) to remove, ie id needs to  match [i].nTimeStamp for removal from ar.
        function RemoveGivenDescendingRecStatsList(ar, nId) { 
            for (let i=0; i < ar.length; i++) {
                if (nId > ar[i].nTimeStamp) {
                    // nId cannot be in list that is in descending order, so quit looking.
                    break;
                } else if (nId === ar[i].nTimeStamp) {
                    // Found nId so delete it from the list.
                    ar.splice(i,1);
                    break;
                }
            }
        }


        // Sets the previous signed in owner (user) id and saves to localStorage.
        this.setPreviousOwnerId = function(sOwnerId) {
            recordStatsXfrInfo.sPreviousOwnerId = sOwnerId;
            SaveInfoToLocalStorage();
        };

        // Previous owner (user) id that is different than currently signed in user.
        // Returns: string. the previous owner id. 
        //          empty string if there was no previous user, which should only
        //          be the case if no one has ever signed in.
        this.getPreviousOwnerId = function() {
            return recordStatsXfrInfo.sPreviousOwnerId;
        };

        // Returns true there a residue currently exists. Note: Probably not used.
        this.isaResidue = function() { 
            const bYes = recordStatsXfrInfo.arDeleteId.length > 0 || 
                         recordStatsXfrInfo.arEditId > 0  || 
                         recordStatsXfrInfo.arDeleteIdPending.length > 0 ||
                         recordStatsXfrInfo.arEditIdPending.length > 0;
            return bYes;
        };

        // Uploads to server updates for wigo_ws_GeoTrailRecordStats objs that have been added or edited.
        // Also deletes at server detetions for wigo_ws_GeoTrailRecordStats objs.
        // Synchronous return: boolean. true for update started. aync completion is indicated by the onDone callback.
        // Arg:
        //  OnDone: callback function with signature:
        //      bOk: boolean: true for successful update. Also true if no update is needed.
        //      sStatus: string. status message. bOk true && sStatus empty, indicates no update needed. 
        // Remarks:
        //  doServerUpdata() uses a temporary array of edits and deletions that is filled from
        //  the edits and deletions that have been accumulated, which are cleared when the transfer
        //  to the server begins. This allows more edits or deletions to be accumulated during the
        //  transfer just in case more edits or deletions occur during the transfer. Once the transfer
        //  for the edits and deletions has completed, the temporary arrays are emptied so they are
        /// ready to be filled by the next update with the server.
        this.doServerUpdates = function(onDone) {
            if (bServerUpdatesInProgress) {
                return false;
            }

            if (typeof onDone !== 'function')
                onDone = function(bOk, sStatus) {}; // Set callback to noop if onDone is not given.

            // Local helper to do async upload to server.
            // Arg:
            //  onDone: callback called upon completion of exchange with server. Signature:
            //      bOk: boolean. true for successful.
            //      sStatus: string. status message. bOk true && sStatus empty indicates no upload needed.
            // Synchronous Return: boolean. true for async upload started or no upload needed.
            function DoUpload(onDone) {
                // Upload new or changed stats items.
                let bStarted = true;
                const arRecStats = GetRecordStatsUploadNeeded(); 
                if (arRecStats.length > 0) {
                    bStarted = model.uploadRecordStatsList(arRecStats, function(bUploadOk, sStatus) {
                        if (bUploadOk) {
                            sStatus = "Uploaded {0} stats item(s)".format(arRecStats.length);
                            // Successful uploaded to server. Clear the pending stats ids for the completed upload.
                            recordStatsXfrInfo.arEditIdPending.splice(0);
                            SaveInfoToLocalStorage();
                        }
                        onDone(bUploadOk, sStatus);
                    });
                } else {
                    onDone(true, ""); // Ok, no upload needed.
                }
                return bStarted
            }

            // Local helper to do async deletions at server.
            // Arg:
            //  onDone: callback called upon completion of exchange with server. Signature.
            //      bOk: boolean. true for successful.
            //      sStatus: string. status message. bOk true && sStatus empty indicates no deletions needed.
            // Synchronous Return: boolean. true for async deletion started or no deletions needed.
            function DoDeleteAtServer(onDone) {
                let bStarted = true;
                const arDeleteTimeStamp = GetRecordStatsDeleteNeeded();
                if (arDeleteTimeStamp.length > 0) {
                    bStarted = model.deleteRecordStatsList(arDeleteTimeStamp, function(bOk, sStatus) {
                        if (bOk) {
                            sStatus = "Deleted from server {0} stats item(s)".format(arDeleteTimeStamp.length);
                            // Successful deleted at server. Clear the pending stats ids for the completed upload.
                            recordStatsXfrInfo.arDeleteIdPending.splice(0);
                            SaveInfoToLocalStorage();
                        }
                        onDone(bOk, sStatus);
                    }); 
                } else {
                    onDone(true, ""); // Ok, no upload needed.
                }
                return bStarted;
            }

            bServerUpdatesInProgress = true;
            let sMsg = ""; // Status message for async completion of all updates (edits and deletes).
            // Do upload to server if needed.
            const bStarted = DoUpload(function(bOk, sStatus) {
                // helper to append a line to sMsg.
                function AppendLineToMsg(sStatus) {
                    if (sMsg.length === 0) {
                        sMsg += sStatus;
                    } else if (sStatus.length > 0) {
                        sMsg += '\n' + sStatus; 
                    }
                }

                if (bOk) {
                    // Completed successful upload to server or no upload needed.
                    AppendLineToMsg(sStatus);
                    // Do deletions at server if needed.
                    const bDeleteStarted = DoDeleteAtServer(function(bOk, sStatus) {
                        // Completed deletions at server or none needed. (May be successs or error.)
                        bServerUpdatesInProgress = false;
                        AppendLineToMsg(sStatus);
                        onDone(bOk, sMsg);                        
                    });
                    if (!bDeleteStarted) {
                        // Report an error if doing deletions at servr fails to start.
                        bServerUpdatesInProgress = false;
                        AppendLineToMsg("Cannot do deletions because server is busy.");
                        onDone(false, sMsg);
                    }
                } else {
                    // Error trying to upload so quit.
                    bServerUpdatesInProgress = false;
                    AppendLineToMsg(sStatus);
                    onDone(bOk, sMsg);
                }
            });
            return bStarted;
        };
        let bServerUpdatesInProgress = false;  // Flag to avoid doing another server update until after completion of current update. 

        // Resets server updates busy. 
        // Note: Should not be needed. Provided in case server updates get hung
        //       in the in-progress state.
        this.resetServerUpdatesBusy = function() { 
            bServerUpdatesInProgress = false;
        }

        // Helper to Check if there are RecordStats items that need to be uploaded to server.
        // Returns: array of wigo_ws_GeoTrailRecordStats objs that need to be uploaded
        //          for current user (owner). 
        //          Returned array is empty if there is nothing to upload
        //          Element 0 of the returned array is the most recent timestamp.
        function GetRecordStatsUploadNeeded() {  
            // Append ids in arEditId to arEditPendingId.
            let i=0;
            for (i=0; i < recordStatsXfrInfo.arEditId.length; i++) {
                AddInDescendingOrder(recordStatsXfrInfo.arEditIdPending, recordStatsXfrInfo.arEditId[i]);
            }
            recordStatsXfrInfo.arEditId.splice(0); // clear the array that is now pending upload to server.
            SaveInfoToLocalStorage(); 

            const aryRecStats =   model.getRecordStatsAry(); 
            const arUploadRecStats = [];
            let recStats = null;
            for (i=0; i < recordStatsXfrInfo.arEditIdPending.length; i++) {
                recStats = aryRecStats.getId(recordStatsXfrInfo.arEditIdPending[i]);
                if (recStats !== null) {
                    arUploadRecStats.push(recStats);
                }
            }
            return arUploadRecStats;            
        };

        // Helper to check if there are RecordStats items that need to be deleted at the server.
        // Returns: array of wigo_ws_GeoTrailTimeStamp objs. the list of ids (timestamps) for stats obj to delete.
        //          Returned array is empty if there is nothing to delete.
        // Remarks
        //  For the array returned, array[i].nTimeStamp is the timestamp. 
        //  The array of wigo_ws_GeoTrailTimeStamp objs returned is what is needed by 
        // wigo_ws_GeoPathsRESTfulApi.DeleteRecordStatsList(..) to delete records at the server. 
        function GetRecordStatsDeleteNeeded() { 
            let i=0;
            for (i=0; i < recordStatsXfrInfo.arDeleteId.length; i++) {
                AddInDescendingOrder(recordStatsXfrInfo.arDeleteIdPending, recordStatsXfrInfo.arDeleteId[i]); 
            }
            recordStatsXfrInfo.arDeleteId.splice(0); // clear the array for deletions that are now pending.
            SaveInfoToLocalStorage();
            let arGeoTrailTimeStamp = [];
            for (let i=0; i < recordStatsXfrInfo.arDeleteIdPending.length; i++) {
                arGeoTrailTimeStamp.push(new wigo_ws_GeoTrailTimeStamp(recordStatsXfrInfo.arDeleteIdPending[i]));
            }
            return arGeoTrailTimeStamp;
        }
        
        // Uploads record stats list to server.
        // Same as model.uploadRecordStatsList(arRecStats, onDone)
        this.uploadRecordStatsList = function(arRecStats, onDone) { 
            return model.uploadRecordStatsList(arRecStats, onDone);
        };

        // Deletes record stats list at server.
        // Same as model.deleteRecordStatsList(arTimeStamp, onDone);
        this.deleteRecordStatsList = function(arTimeStamp, onDone) { 
            return model.deleteRecordStatsList(arTimeStamp, onDone); 
        };

        // Downloads objecto for array of record stats from server.
        // Arg:
        //  onDone: callback function whose signature is:
        //      bOk: boolean: true for sucessful upload.
        //      aryStats: RecordStatsAryServer object. contains array of wigo_ws_GeoTrailRecordStats objs
        //                and has members to access the array.
        //      sStatus: string: description for the download result.
        //      Returns: void
        this.downloadRecordStatsAry = function(onDone) { 
                //      bOk: boolean: true for sucessful upload.
                //      arStats: array of wigo_ws_GeoTrailRecordStats objs. the list that has been downloaded.
                //      sStatus: string: description for the download result.
                //      Returns: void

            let bStarted = model.downloadRecordStatsList(function(bOk, arStats, sStatus){
                recordStatsAryServer.Clear();
                if (bOk) {
                    recordStatsAryServer.setList(arStats);
                } else {
                    recordStatsAryServer.Clear();
                }
                if (onDone) {
                    onDone(bOk, recordStatsAryServer, sStatus);
                }
            });
            return bStarted;
        };

        // Gets ref to object for array of local record stats currently in memory.
        // Returns: RecordStatsAry object. Contains array of local stats object
        //          and has members to access the array. 
        this.getLocalRecordStatsAry = function() { 
            return model.getRecordStatsAry(); 
        };

        // Returns true if current user id is same as previous user id,
        // or if previous user id is empty.
        // Note: user id means the same as owner id.
        this.isSameUser = function() { 
            const  bSameUser = recordStatsXfrInfo.sPreviousOwnerId.length === 0 ||
                               model.getOwnerId() === recordStatsXfrInfo.sPreviousOwnerId;
            return bSameUser;
        };

        // Gets residue of wigo_ws_GeoTrailRecordStats objs for an owner.
        // Arg:
        //  sOwnerId: string for owner id of the residue.
        // Returns: ref to wigo_ws_RecordStatsXfrResidue obj, 
        //          which contains arrays for residue of edits and timestamps.
        //          null if there is no residue for sOwnerId.
        //          Note: sOwner may be found, but return an empty array if there no residue.
        this.getResidue = function(sOwnerId) {
            let residue = null;
            for (var i=0; i < arResidue.length; i++){
                if (arResidue[i].sOwnerId === sOwnerId) {
                    residue = arResidue[i];
                    break;
                }
            }
            return residue;
        };

        //20190725Redo var arUploadRecStats = recordStatsXfr.getRecordStatsUploadNeeded();
        //20190725Redo const arDeleteId = recordStatsXfr.getRecordStatsDeleteIdsNeeded();

        // Moves to stats residue for a user's edits and deletes that have been done locally, 
        // but not uploaded to server. Saves the updated residue to localStorage.
        // Also clears the edits and deletes because they have been appended 
        // to the residue of the user (owner) and saves the updated edits and deletes 
        // (recordStatsXfrInfo) to localStorage.
        // Args:
        //  sOwnerId: string for owner id (user id) of the residue.
        // Returns: none 
        this.moveEditsAndDeletesIntoResidue = function(sOwnerId) {
            try {  
                // It is important an uncaught exception does not occurred 
                // in order to avoid arRecordStat being for the wrong owner (user).
                // throw "testing exception for RecordStatsXfr moveEditsAndDeletesIntoResidue(sOwnerId)."; // Only for testing.

                if (!sOwnerId) { 
                    // Quit if sOwner is invalid, ie emtpy string, null, or undefined.
                    // Should not happen.
                    console.log("RecordStatsXfr moveEditsAndDeletesIntoResidue(sOwner) called with invalid sOwnerId" );
                    return;
                }

                let residue = null;
                for (let i=0; i < arResidue.length; i++) {
                    if (arResidue[i].sOwnerId === sOwnerId) {
                        residue = arResidue[i];
                        break;
                    }
                }
                if (!residue) {
                    // Add new element for owner to arResidue.
                    residue = new wigo_ws_RecordStatsXfrResidue();
                    residue.sOwnerId = sOwnerId;
                    arResidue.push(residue);
                }


                // Get ref to list of current RecStats in memory.
                const aryRecStats =   model.getRecordStatsAry(); 

                // Note: Append pending edits and deletes first to the residue for 
                // coherence of changes over time. The pending edits and pending deletes
                // have occurred before the edits and deletes.
                
                // Append the stats for pending edits to the residue of the owner (user).
                let recStats = null;  
                for (let i=0; i < recordStatsXfrInfo.arEditIdPending.length; i++) {
                    recStats = aryRecStats.getId(recordStatsXfrInfo.arEditIdPending[i]);
                    if (recStats !== null) {
                        AddRecStatsInDescendingOrder(residue.arRecStats, recStats);
                        RemoveGivenDescendingList(residue.arDeleteId, recStats.nTimeStamp);  
                    }
                }
                recordStatsXfrInfo.arEditIdPending.splice(0);

                // Append the stats for pending deletes to residue of the owner (user).
                for (let i=0; i < recordStatsXfrInfo.arDeleteIdPending.length; i++) {
                    AddInDescendingOrder(residue.arDeleteId, recordStatsXfrInfo.arDeleteIdPending[i]);
                    RemoveGivenDescendingRecStatsList(residue.arRecStats, recordStatsXfrInfo.arDeleteIdPending[i]); 
                }
                recordStatsXfrInfo.arDeleteIdPending.splice(0);

                // Append the stats in list of edits to the residue of the owner (user).
                for (let i=0; i < recordStatsXfrInfo.arEditId.length; i++) {
                    recStats = aryRecStats.getId(recordStatsXfrInfo.arEditId[i]);
                    if (recStats !== null) {
                        AddRecStatsInDescendingOrder(residue.arRecStats, recStats);
                        RemoveGivenDescendingList(residue.arDeleteId, recStats.nTimeStamp); 
                    }
                }
                recordStatsXfrInfo.arEditId.splice(0);
                
                // Append the stats in the list of deletes to the residue of the owner (user).
                for (let i=0; i < recordStatsXfrInfo.arDeleteId.length; i++) {
                    AddInDescendingOrder(residue.arDeleteId, recordStatsXfrInfo.arDeleteId[i]);
                    RemoveGivenDescendingRecStatsList(residue.arRecStats, recordStatsXfrInfo.arDeleteId[i]); 

                }
                recordStatsXfrInfo.arDeleteId.splice(0);
            } catch (ex) {
                console.log("Exception occurred in RecordStatsXfr moveEditsAndDeletesIntoResidue(sOwnerId).");
            }

            // Save the changes to localStorage.
            SaveInfoToLocalStorage();
            SaveResidueToLocalStorage();
            return; 
        };

        // Moves stats residue into existing stats edits and deletes and
        // clears the stats residue.
        // Arg:
        //  sOwnerId: string. user id for the residue.
        this.moveResidueIntoEditsAndDeletes = function(sOwnerId, bSameUser) { 
            try { 
                // It is important to avoid an uncaught exception in order
                // to ensure continuation will load the RecordStats for a new user.
                // throw "Test exception in RecordStatsXfr moveResidueIntoEditsAndDeletes(sOwnerId, bSameUser). ";  // only for testing

                // get ref to RecStats array to check if a RecStats residue is missing and needs to be added.
                const aryRecStats = model.getRecordStatsAry(); 

                // Helper to return an array of numbers for edit ids.
                function GetResidueEditIdList() {
                    let found = null;
                    let arEditId = [];
                    for (let i=0; i < residue.arRecStats.length; i++) {
                        arEditId.push(residue.arRecStats[i].nTimeStamp);
                        found = arRecordStats.getId(residue.arRecStats[i].nTimeStamp);
                        if (found === null) {
                            // Add to aryRecStats the residue that is missing.
                            aryRecStats.setId(residue.arRecStats[i]);
                        } else {
                            // Found the RecStats in the current list in memory of all RecStats.
                            if (!bSameUser) {
                                // Replace the residue RecStats in the memory list of all RecStats.
                                // Note: For same user, the RecStats in memory is not replaced because the RecStats in memory
                                //       is more recent than the residue RecStats.
                                aryRecStats.setId(residue.arRecStats[i]);
                            }
                        }
                    }
                    return arEditId;
                }

                // Helper to return an array of numbers that are delete ids.
                // Note: A new array is formed and returned as opposed to assigning residue.arDeleteId
                //       because residue.arDeleteId is set to empty by arDeleteId.splice(0), 
                //       which still refers to same memory location, when this.clearResidue(sOwnerId) is called. 
                //       What is needed is residue.arDeleteId before it is emptied.
                function GetResidueDeleteIdList() {  
                    let arDeleteId = [];
                    for (let i=0; i < residue.arDeleteId.length; i++) {
                        arDeleteId.push(residue.arDeleteId[i]);
                    }
                    return arDeleteId;
                }

                const residue = this.getResidue(sOwnerId);
                if (residue === null) {
                    // Quit when there is no residue for the user (sOwnerId).
                    return; 
                }

                // Note: setting the residue for edits and deletes to the beginning of the newly formed
                //       edits and deletes keeps a time coherence for doing edits and deletes because
                //       the residue edits and residue deletes occurred first.
                
                // Set the residue for edits at the beginning of the edits.
                const arCurEditId = recordStatsXfrInfo.arEditId;
                recordStatsXfrInfo.arEditId = GetResidueEditIdList();

                // Set the residue of deletes at the beginning of the deletes.
                const arCurDeleteId = recordStatsXfrInfo.arDeleteId; 
                recordStatsXfrInfo.arDeleteId = GetResidueDeleteIdList(); // Note: cannot use = residue.arDeleteId;  

                // Note: adding pending edits and deletes before adding back edits and deletes keeps a 
                //       a time coherence of doing edits and deletes because the pending ones occurred first.
                // Add pending edits to edits.
                for (let i=0; i < recordStatsXfrInfo.arEditIdPending.length; i++) {
                    AddInDescendingOrder(recordStatsXfrInfo.arEditId, recordStatsXfrInfo.arEditIdPending);
                    RemoveGivenDescendingList(recordStatsXfrInfo.arDeleteId, recordStatsXfrInfo.arEditIdPending); 
                }
                // Add pending deletes to deletes.
                for (let i=0; i < recordStatsXfrInfo.arDeleteIdPending.length; i++) {
                    AddInDescendingOrder(recordStatsXfrInfo.arDeleteId,  recordStatsXfrInfo.arDeleteIdPending[i]);
                    RemoveGivenDescendingList(recordStatsXfrInfo.arEditId, recordStatsXfrInfo.arDeleteIdPending[i]);
                }

                // Clear the pending edits and deletes regardless whether the owner was the same or not.
                recordStatsXfrInfo.arDeleteIdPending.splice(0);
                recordStatsXfrInfo.arEditIdPending.splice(0);

                // Add back the current edit ids.
                for (let i=0; i < arCurEditId.length; i++) {
                    AddInDescendingOrder(recordStatsXfrInfo.arEditId, arCurEditId[i]);
                    RemoveGivenDescendingList(recordStatsXfrInfo.arDeleteId, arCurEditId[i]); // add edit is not in delete list.
                }
                // Add back the current delete ids.
                for (let i=0; i < arCurDeleteId.length; i++) {
                    AddInDescendingOrder(recordStatsXfrInfo.arDeleteId, arCurDeleteId[i]);
                    RemoveGivenDescendingList(recordStatsXfrInfo.arEditId, arCurDeleteId[i]);
                }

                // Save the changes for the newly formed edits and deletes to localStorage.
                SaveInfoToLocalStorage();

                // clear residue that has been merged into current edits and
                // save the residue to localStorage.
                this.clearResidue(sOwnerId);
            } catch (ex) {
                console.log("Exception occurred in RecordStats XfrmoveResidueIntoEditsAndDeletes(OwnerId, bSameUser).");
            } 
        }

        // Clears the residue for an owner and saves to localStorage.
        // If no owner is found does nothing.
        // Arg:
        //  sOwnerId: string for owner id.
        this.clearResidue = function(sOwnerId) {
            for (var i=0; i < arResidue.length; i++) {
                if (arResidue[i].sOwnerId === sOwnerId) {
                    arResidue[i].arRecStats.splice(0); // Clears array with ref unchanged.
                    arResidue[i].arDeleteId.splice(0); // Clears array with ref unchanged. arDeleteId
                    SaveResidueToLocalStorage();
                    break;
                }
            }
        };

        
        // Clears arRecordSat in memory and saves to localStorage.
        this.clearRecordStatsAndSave = function() {  
            arRecordStats.Clear(); 
            arRecordStats.SaveToLocalStorage();
        };

        // **** Private members

        // Loads record stats xfr info from localStorage.
        // Returns: wigo_ws_RecordStatsXfr obj.
        function LoadInfoFromLocalStorage() {
            if (localStorage && localStorage[sRecordStatsXfrInfoKey]) { 
                let bFixed = false;
                // Helper to fix error that happened initially.
                function FixArrayError(ar) {
                    if (ar.length > 0) {
                        if (typeof ar[0] !== 'number') {
                            ar.splice(0);                            
                            bFixed = true;
                        }
                    }
                }

                recordStatsXfrInfo = JSON.parse(localStorage[sRecordStatsXfrInfoKey]);
                // Initialize new members that may be missing.
                if (recordStatsXfrInfo.arDeleteId === undefined) {
                    recordStatsXfrInfo.arDeleteId = [];
                }
                if (recordStatsXfrInfo.arEditId === undefined) {
                    recordStatsXfrInfo.arEditId = [];
                }
                if (recordStatsXfrInfo.arDeleteIdPending === undefined) {
                    recordStatsXfrInfo.arDeleteIdPending = [];
                }
                if (recordStatsXfrInfo.arEditIdPending === undefined) {
                    recordStatsXfrInfo.arEditIdPending  = [];
                }
                // Correct some errors that should not have happened.
                FixArrayError(recordStatsXfrInfo.arEditId);
                FixArrayError(recordStatsXfrInfo.arDeleteId);
                FixArrayError(recordStatsXfrInfo.arEditIdPending);
                FixArrayError(recordStatsXfrInfo.arDeleteIdPending);
                if (bFixed) {
                    SaveInfoToLocalStorage();
                }
            }
            return recordStatsXfrInfo;
        };

        // Saves record stats xfr info to localStorage.
        function SaveInfoToLocalStorage() {
            if (localStorage) {
                localStorage[sRecordStatsXfrInfoKey] = JSON.stringify(recordStatsXfrInfo);
            }
        }

        // Loads arResidue from localStorage.
        function LoadResidueFromLocalStorage() {
            if (localStorage && localStorage[sRecordStatsXfrResidueKey]) { 
                arResidue = JSON.parse(localStorage[sRecordStatsXfrResidueKey]);
                // Initialize new members that may be missing.
                for (let i=0; i < arResidue.length; i++) {
                    if (arResidue[i].arDeleteId === undefined) {  
                        arResidue[i].arDeleteId = []; 
                    }
                }
            } else {
                arResidue = [];
            }
        };

        // Saves arResidue to localStorage.
        function SaveResidueToLocalStorage() {
            if (localStorage) {
                localStorage[sRecordStatsXfrResidueKey] = JSON.stringify(arResidue);
            }
        }

        // Constructor initialization.
        var arResidue; // Array of wigo_ws_RecordStatsXfrResidue objs.
        LoadResidueFromLocalStorage(); // Sets arResidue from localStorate. 

        var recordStatsAryServer = new RecordStatsAryServer(); 

        var recordStatsXfrInfo = new wigo_ws_RecordStatsXfrInfo();
        LoadInfoFromLocalStorage();
    }


    // Settings for My Geo Trail.
    var geoTrailSettings = new GeoTrailSettings();
    geoTrailSettings.LoadFromLocalStorage();

    // Version for GeoTrail app in localStorage.
    var geoTrailVersion = new GeoTrailVersion();
    geoTrailVersion.LoadFromLocalStorage();

    var geoTrailRecordStatsXfr = new RecordStatsXfr(this); 

    // Network information object. Wrapper for cordova-plugin-network-information.
    var networkInfo = wigo_ws_NewNetworkInformation(deviceDetails);
}
