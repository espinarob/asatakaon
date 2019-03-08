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
	TouchableWithoutFeedback} 
	from 'react-native';
import {
	Container, 
	Icon,
	Spinner} 
	from 'native-base';
import * as firebase from 'firebase';
import SyncStorage   from 'sync-storage';

/* -- Custom Components  -- */

import Constants from './Constants.js';


export default class LoadingScreen extends Component{

	render() {
	    return (
	    	<React.Fragment>
	    		<Image 
					source={require('../img/content/content_2.jpg')}
		    		style={{
		    			height:'100%',
		    			width: '100%',
		    			position: 'absolute',
		    			resizeMode:'stretch'
		    		}}/>
		    	<View style={{
		    				height: '44%',
		    				width: '100%',
		    				position: 'absolute',
		    				top: '38%',
		    				backgroundColor: '#fff',
		    				opacity: 0.7
		    		}}>

		    	</View>

		    	<View 	style={{
		    				height: '100%',
		    				width: '100%'
		    	}}>
		    		<View style={{
		    				height: '40%',
		    				width: '100%',
		    				position: 'relative',
		    				top: '38%'
		    		}}>
		    			<Text style={{
		    					position:'relative',
		    					height: '34%',
		    					width: '55%',
		    					textAlign: 'center',
		    					left: '22.25%',
		    					top: '5%',
		    					fontSize:25,
		    					fontWeight: 'bold',
		    					borderColor: '#000',
		    					color: '#ba0bc6',
		    			}}>
		    				ASA-TA-KAON?{'\n'}
		    				<Icon
		    					style = {{
		    						fontSize: 35,
		    						color: '#ba0bc6'
		    					}}
		    					name  = 'location-pin'
		    					type  = 'Entypo'/>
		    			</Text>
			    		

			    		<Spinner 	style={{
	    								fontSize: 15,
		    							position: 'relative',
		    							top:'13%',
		    							height: '8%'
    								}}
	    							color='#ba0bc6'/>

	    				<Text style={{
		    					position:'relative',
		    					height: '25%',
		    					width: '60%',
		    					textAlign: 'center',
		    					textAlignVertical: 'center',
		    					left: '20%',
		    					top: '25%',
		    					fontSize:15,
		    					fontWeight: 'bold',
		    					borderColor: '#000',
		    					color: '#ba0bc6',
		    			}}>
		    				{this.props.loadingText}
		    			</Text>
		    		</View>

		    	</View>
		    </React.Fragment>
	    );
  	}
}
