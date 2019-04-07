import React, 
	{Component} 
	from 'react';
import {Platform, 
	StyleSheet, 
	Text, 
	View, 
	AsyncStorage,
	Image,
	NetInfo,
	TouchableWithoutFeedback,
	TextInput,
	Picker,
	CheckBox} 
	from 'react-native';
import {
	Container, 
	Icon,
	Spinner} 
	from 'native-base';
import SyncStorage   from 'sync-storage';
import MapView       from 'react-native-maps';
import {Marker}      from 'react-native-maps';
import Geolocation   from 'react-native-geolocation-service';

/* -- Custom Components  -- */
import Constants from '../commons/Constants.js';


export default class OwnersLandingPage extends Component{

	render() {
	    return (
	    	<React.Fragment>

	    	</React.Fragment>
		);
  	}
}
