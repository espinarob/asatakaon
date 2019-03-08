import React, 
	{Component} 
	from 'react';
import {Platform, 
	StyleSheet, 
	Text, 
	View, 
	AsyncStorage,
	NetInfo,
	PermissionsAndroid} 
	from 'react-native';
import {Container}   from 'native-base';
import * as firebase from 'firebase';
import SyncStorage   from 'sync-storage';
import RNFetchBlob   from 'react-native-fetch-blob';
import Geolocation   from 'react-native-geolocation-service';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

/* === User Created Components  === */

import Constants            from './commons/Constants.js';
import LoadingScreen        from './commons/LoadingScreen.js';
import ReportDisplay        from './commons/ReportDisplay.js';
import WelcomePage          from './commons/WelcomePage.js';
import SplashScreen         from './commons/SplashScreen.js'; 
import FindRestaurant       from './commons/FindRestaurant.js';
import AddFoodEstablishment from './add/AddFoodEstablishment.js';
import LoginPage            from './login/LoginPage.js';
import RegistrationPage     from './registration/RegistrationPage.js';


export default class Main extends Component{

	state = {
		reportMessage    : '',
		loadingText      : '',
		applicationPages : Constants.APP_PAGES.SPLASH_SCREEN_APP,
		onlineConnected  : false,
		usersLocation    : {}
	}

	/* === For Registration === */
	registerUserCredentials = (userData)=>{
		firebase
			.database()
			.ref()
			.child("USERS")
			.orderByChild("username")
			.equalTo(String(userData.username))
			.once("value",snapshot=>{
				if(snapshot.exists()){
					this.sendAReportMessage('The input username is already taken');
					setTimeout(()=>this.sendAReportMessage(''),Constants.REPORT_DISPLAY_TIME);
				}
				else{
					firebase
						.database()
						.ref()
						.child("USERS")
						.orderByChild("email")
						.equalTo(String(userData.email))
						.once("value",snapshot=>{
							if(snapshot.exists()){
								this.sendAReportMessage('The input email is already taken');
								setTimeout(()=>this.sendAReportMessage(''),Constants.REPORT_DISPLAY_TIME);
							}
							else{
								this.setState({loadingText:'Getting your registration, please wait..'});
								this.changeMainApplicationDisplay(Constants.APP_PAGES.LOADING_SCREEN_APP);
								const userKey = 	firebase
														.database()
														.ref("USERS")
														.push();
								userKey
									.update({
										firstName  : userData.firstName,
										lastName   : userData.lastName,
										address    : userData.address,
										email      : userData.email,
										username   : userData.username,
										password   : userData.password,
										gender     : userData.gender,
										accountID  : String(userKey.key)
									})
									.then(()=>{
										this.sendAReportMessage('You have been successfully registered!');
										setTimeout(()=>{
											this.sendAReportMessage('');
											this.setState({loadingText:''});
											this.changeMainApplicationDisplay(Constants.APP_PAGES.FIND_RESTAURANT_APP);
										},Constants.REPORT_DISPLAY_TIME);
										
									})
									.catch((error)=>{
										this.sendAReportMessage('Check your connectivity, you are offline');
										setTimeout(()=>{
											this.sendAReportMessage('');
											this.setState({loadingText:''});
											this.changeMainApplicationDisplay(Constants.APP_PAGES.FIND_RESTAURANT_APP);
										},Constants.REPORT_DISPLAY_TIME);
										
									});
							}
						})
						.catch((error)=>{
							this.sendAReportMessage('Check your connectivity, you are offline');
							setTimeout(()=>this.sendAReportMessage(''),Constants.REPORT_DISPLAY_TIME);
						});
				}
			})
			.catch((error)=>{
				this.sendAReportMessage('Check your connectivity, you are offline');
				setTimeout(()=>this.sendAReportMessage(''),Constants.REPORT_DISPLAY_TIME);
			});
	}

	/* === End === */



	componentDidMount(){
		if(!firebase.apps.length){
			firebase.initializeApp(Constants.FIRE_BASE_CONFIG);
		}
		this.controlSplashScreen();
		NetInfo.isConnected.addEventListener('connectionChange',this.handleDataConnectivity);
		this.askUserGPSPermission();
	}


	askUserGPSPermission = async()=>{
		try {
   			const granted = await PermissionsAndroid.request(
   				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			 	{
			        title: 'Location Persistence',
			        message:
			          'AsaTaKaon application needs access to your camera ',
			        buttonNegative: 'Cancel',
			        buttonPositive: 'OK',
  				}
			);
			if(granted === PermissionsAndroid.RESULTS.GRANTED){
		      	console.log('You can user user location');
		      	this.getUserLocation();
		    } 
		    else{
		      console.log('Location permission denied');
		    }
		} 
		catch(error){
    		console.log(error);
	  	}	
	}

	getUserLocation = ()=>{
		Geolocation.getCurrentPosition( (position)=>{
			this.setState({usersLocation:position.coords});
		},(error) => {
			console.log(JSON.stringify(error));
			this.setState({usersLocation:[]});
		});
	}

	handleDataConnectivity = (isConnected)=>{
		if(isConnected === true){
			this.sendAReportMessage(Constants.LOADING_TEXT.GETTING_CONNECTED);
			fetch('https://jsonplaceholder.typicode.com/todos/1')
		  		.then(response =>{
		  			this.setState({onlineConnected: true});
		  			this.sendAReportMessage(Constants.LOADING_TEXT.USER_CONNECTED);
					setTimeout(()=>this.sendAReportMessage(''),Constants.REPORT_DISPLAY_TIME);
		  		})
		  		.catch((error)=>{
		  			this.setState({onlineConnected: false});
					this.sendAReportMessage(Constants.LOADING_TEXT.USER_OFFLINE);
					setTimeout(()=>this.sendAReportMessage(''),Constants.REPORT_DISPLAY_TIME);
		  		});
		}
		else{
			this.setState({onlineConnected: false});
			this.sendAReportMessage(Constants.LOADING_TEXT.USER_OFFLINE);
			setTimeout(()=>this.sendAReportMessage(''),Constants.REPORT_DISPLAY_TIME);
		}
	}

	controlSplashScreen = ()=>{
		setTimeout(()=>{
			this.setState({applicationPages:Constants.APP_PAGES.WELCOME_APP_PAGE});
		},Constants.TIME.SPLASH_SCREEN_TIME);
	}

	changeMainApplicationDisplay = (applicationPages)=>{
		this.setState({applicationPages:applicationPages});
	}

	MainApplicationDisplay = ()=>{
		switch(this.state.applicationPages){
			case Constants.APP_PAGES.LOADING_SCREEN_APP:
				return 	<LoadingScreen 
							loadingText            = {this.state.loadingText} />
			case Constants.APP_PAGES.WELCOME_APP_PAGE:
				return 	<WelcomePage
							doChangeMainAppDisplay = {this.changeMainApplicationDisplay} />;
			case Constants.APP_PAGES.SPLASH_SCREEN_APP:
				return 	<SplashScreen/>;
			case Constants.APP_PAGES.FIND_RESTAURANT_APP:
				return 	<FindRestaurant
							doGetUsersLocation     = {this.state.usersLocation}
							doChangeMainAppDisplay = {this.changeMainApplicationDisplay} />;
			case Constants.APP_PAGES.LOGIN_APP_PAGE:
				return 	<LoginPage 
							doChangeMainAppDisplay = {this.changeMainApplicationDisplay} />;
			case Constants.APP_PAGES.SIGN_APP_PAGE:
				return 	<RegistrationPage
							doRegisterUser         = {this.registerUserCredentials}
							doSendAReportMessage   = {this.sendAReportMessage}
							doChangeMainAppDisplay = {this.changeMainApplicationDisplay} />;
			case Constants.APP_PAGES.SIGN_RESTAURANT:
				return 	<AddFoodEstablishment
							doChangeMainAppDisplay = {this.changeMainApplicationDisplay} />;
		}
	}

	reportApplicationDisplay = ()=>{
		if(this.state.reportMessage.length!=0){
			return 	<ReportDisplay
						reportMessage = {this.state.reportMessage} />
		}
		else{
			return;
		}
	}

	sendAReportMessage = (report)=>{
		this.setState({reportMessage:report});
	}

	render() {
	    return (
	    	<React.Fragment>
	    		{this.MainApplicationDisplay()}
	    		{this.reportApplicationDisplay()}
	    	</React.Fragment>
	    );
  	}
}
