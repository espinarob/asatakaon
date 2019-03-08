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
import {Container, Icon} from 'native-base';
import * as firebase from 'firebase';
import SyncStorage   from 'sync-storage';

/* -- Custom Components  -- */

import Constants from './Constants.js';


export default class WelcomePage extends Component{

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

		    			<TouchableWithoutFeedback
		    				onPress={()=>this.props.doChangeMainAppDisplay(Constants.APP_PAGES.FIND_RESTAURANT_APP)}>
			    			<Text style={{
			    					height: '20%',
			    					width: '40%',
			    					borderWidth: 2,
			    					position: 'relative',
			    					top: '17%',
			    					left: '30%',
			    					fontSize: 15,
			    					paddingTop: '3%',
			    					color: '#000',
			    					textAlign:'center',
			    					borderRadius: 100,
			    					color: '#ba0bc6',
			    					fontWeight: '900'
			    			}}>	
			    				Find Restaurant
			    			</Text>
			    		</TouchableWithoutFeedback>

			    		<TouchableWithoutFeedback
			    			onPress={()=>console.log('manual')}>
			    			<Text style={{
			    					height: '20%',
			    					width: '40%',
			    					borderWidth: 2,
			    					position: 'relative',
			    					top: '23%',
			    					left: '30%',
			    					fontSize: 15,
			    					paddingTop: '3%',
			    					color: '#000',
			    					textAlign:'center',
			    					borderRadius: 100,
			    					color: '#ba0bc6',
			    					fontWeight: '900'
			    			}}>	
			    				Our Manual
			    			</Text>
			    		</TouchableWithoutFeedback>
			    		
		    		</View>

		    	</View>
		    </React.Fragment>
	    );
  	}
}
