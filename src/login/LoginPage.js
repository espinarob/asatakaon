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
	TextInput} 
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


export default class LoginPage extends Component{

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
		    				opacity: 0.7
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
		    					width: '55%',
		    					position: 'relative',
		    					left: '22.25%',
		    					top: '15%',
		    					borderWidth: 2,
		    					fontWeight: 'bold',
		    					fontSize: 20,
		    					color: '#000',
		    					textAlign: 'center',
		    					textAlignVertical: 'center',
		    					color: '#ba0bc6',
		    					borderRadius: 100
		    			}}>
		    				LOGIN-PAGE
		    			</Text>

		    			<Text style={{
		    					height: '4%',
		    					width: '33%',
		    					position: 'relative',
		    					left: '10%',
		    					fontSize: 15,
		    					color: '#000',
		    					top: '25%',
		    					fontWeight: 'bold'
		    			}}>
		    				USERNAME
		    			</Text>

		    			<View style={{
		    					height: '9%',
		    					position: 'relative',
		    					top: '45%',
		    					flexDirection: 'row'
		    			}}>
		    				<Text style={{
		    						height:'100%',
		    						width: '15%',
		    						left: '40%',
		    						position: 'relative',
		    						textAlignVertical: 'center',
		    						textAlign: 'center'
		    				}}>	
		    					<Icon
		    						style = {{
		    							fontSize: 35,
		    							color: '#ba0bc6'
		    						}} 
		    						name  = 'user'
		    						type  = 'FontAwesome'/>
		    				</Text>

		    				<TextInput
		    					placeholder = 'FILL IN USERNAME' 
		    					style       = {{
		    						height: '100%',
		    						color: '#000',
		    						width: '60%',
		    						position: 'relative',
		    						left: '43%',
		    						borderBottomWidth: 3,
		    						borderColor: '#ba0bc6' 
		    					}}/>

		    			</View>

		    			<Text style={{
		    					height: '4%',
		    					width: '33%',
		    					position: 'relative',
		    					left: '10%',
		    					fontSize: 15,
		    					color: '#000',
		    					top: '35%',
		    					fontWeight: 'bold'
		    			}}>
		    				PASSWORD
		    			</Text>

		    			<View style={{
		    					height: '9%',
		    					position: 'relative',
		    					top: '55%',
		    					flexDirection: 'row'
		    			}}>
		    				<Text style={{
		    						height:'100%',
		    						width: '15%',
		    						left: '40%',
		    						position: 'relative',
		    						textAlignVertical: 'center',
		    						textAlign: 'center'
		    				}}>	
		    					<Icon
		    						style = {{
		    							fontSize: 35,
		    							color: '#ba0bc6'
		    						}} 
		    						name  = 'lock'
		    						type  = 'FontAwesome'/>
		    				</Text>

		    				<TextInput	
		    					secureTextEntry={true}
		    					placeholder    = '*********'
		    					style          = {{
		    						height: '100%',
		    						width: '60%',
		    						position: 'relative',
		    						left: '43%',
		    						borderBottomWidth: 3,
		    						borderColor: '#ba0bc6' 
		    					}}/>
		    			</View>

		    			<Text style={{
		    					height: '9%',
		    					textAlignVertical: 'center',
		    					textAlign: 'center',
		    					top: '45%',
		    					position: 'relative',
		    					width: '30%',
		    					color: '#000',
		    					fontSize: 15,
		    					borderWidth: 3,
		    					fontWeight: 'bold',
		    					left: '35%',
		    					color: '#ba0bc6' 
		    			}}>
		    				LOGIN
		    			</Text>
		    	</View>
		    </React.Fragment>
	    );
  	}
}
