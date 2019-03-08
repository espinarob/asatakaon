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
	Picker} 
	from 'react-native';
import {
	Container, 
	Icon,
	Spinner} 
	from 'native-base';
import * as firebase from 'firebase';
import SyncStorage   from 'sync-storage';

/* -- Custom Components  -- */

import Constants from '../commons/Constants.js';


export default class AddFoodEstablishment extends Component{

	state = {

	}

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
		    				height: '91%',
		    				top:'9%',
		    				width: '100%',
		    				position: 'absolute',
		    				backgroundColor: '#fff',
		    				opacity: 0.4
		    		}}>

		    	</View>

		    	<View style={{
		    				height: '9%',
		    				width: '100%',
		    				position: 'absolute',
		    				backgroundColor: '#ba0bc6'
		    		}}>
		    			<TouchableWithoutFeedback
		    				onPress={()=>this.props.doChangeMainAppDisplay(Constants.APP_PAGES.FIND_RESTAURANT_APP)}>
			    			<Text style={{
			    					height: '50%',
			    					width: '18%',
			    					position: 'relative',
			    					borderWidth: 2,
			    					color: '#000',
			    					fontSize: 13,
			    					fontWeight: 'bold',
			    					textAlign: 'center',
			    					textAlignVertical: 'center',
			    					borderRadius: 100,
			    					top: '20%',
			    					left: '2%'
			    			}}>
			    				RETURN
			    			</Text>
			    		</TouchableWithoutFeedback>
		    	</View>


		    	<View 	style={{
		    				height: '100%',
		    				width: '100%',
		    				position:'relative'
		    	}}>
		    			<Text style={{
		    					height: '9%',
		    					width: '70%',
		    					position: 'relative',
		    					left: '15%',
		    					top: '12%',
		    					borderWidth: 1.8,
		    					fontWeight: 'bold',
		    					fontSize: 20,
		    					borderColor: '#000',
		    					color: '#000',
		    					textAlign: 'center',
		    					textAlignVertical: 'center',
		    					borderRadius: 100
		    			}}>
		    				REGISTER YOUR RESTAURANT
		    			</Text>
		    			<View style={{
				    			height: '73%',
				    			width:'100%',
				    			position: 'absolute',
				    			opacity: 0.9,
				    			top: '24%',
				    			backgroundColor: '#fff'	
				    	}}>
				    		<Text style={{
				    				position: 'relative',
				    				top: '5%',
				    				width:'40%',
				    				left: '30%',
				    				textAlignVertical: 'center',
				    				textAlign: 'center',
				    				fontSize:15,
				    				color: '#000',
				    				fontWeight: 'bold'
				    		}}>
				    			Restaurant Name
				    		</Text>

				    		<View style={{
		    						height: '11%',
		    						width: '50%',
		    						top: '5%',
		    						position: 'relative',
		    						left: '25%',
		    						borderWidth: 2,
		    						borderRadius: 100
		    				}}>
		    					<TextInput
		    						placeholder   = 'restaurant name'
		    						style={{
		    							height: '100%',
		    							width: '86%',
		    							fontSize: 14,
		    							position:'relative',
		    							left: '7%'
		    						}}/>
			    			</View>
				    	</View>	

		    	</View>
		    </React.Fragment>
	    );
  	}
}
