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
import MapView       from 'react-native-maps';
import {Marker}      from 'react-native-maps';

/* -- Custom Components  -- */

import Constants from './Constants.js';


export default class FindRestaurant extends Component{

	getMapDisplay = ()=>{
		if(this.props.doGetUsersLocation.length!=0){
			return	<MapView style = {{height:'100%',width: '100%'}}
						provider={MapView.PROVIDER_GOOGLE}
			            region = {{
			                latitude       : this.props.doGetUsersLocation.latitude,
			                longitude      : this.props.doGetUsersLocation.longitude,
			                latitudeDelta  : 0.0922*6,
			                longitudeDelta : 0.0421*6,
		                }}>
		                <Marker
				      		coordinate={{latitude:this.props.doGetUsersLocation.latitude,
				      			longitude:this.props.doGetUsersLocation.longitude}}
					      	title={'Hello user!'}
					      	description={'Here is your location'}/>
        			</MapView>
		}
		else{
			return 	<Text style={{
							height: '6%',
							position:'relative',
							top: '45%',
							width:'100%',
							fontSize: 15,
							fontWeight: 'bold',
							textAlign: 'center',
							textAlignVertical: 'center',
							color: '#000'
					}}>
						Getting your location in map, please wait..
					</Text>
		}
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
		    				onPress={()=>this.props.doChangeMainAppDisplay(Constants.APP_PAGES.WELCOME_APP_PAGE)}>
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
		    				width: '100%'
		    	}}>
		    		<View style={{
		    				height: '73%',
		    				width:'100%',
		    				position: 'absolute',
		    				top: '22%',
		    				opacity: 0.9,
		    				backgroundColor:'#fff'
		    		}}>

		    		</View>
		    		<TouchableWithoutFeedback
		    			onPress={()=>this.props.doChangeMainAppDisplay(Constants.APP_PAGES.LOGIN_APP_PAGE)}>
		    			<Text style={{
		    					height: '12.5%',
		    					width: '20.8%',
		    					borderRadius: 100,
		    					position:'absolute',
		    					left: '76%',
		    					top: '4%',
		    					fontWeight: 'bold',
		    					textAlign: 'center',
		    					textAlignVertical: 'center',
		    					backgroundColor: '#ba0bc6',
		    					borderColor: '#fff',
		    					borderWidth:3,
		    					color: '#000',
		    					fontSize: 12
		    			}}>
		    				<Icon
		    					style={{
		    						fontSize: 30,
		    						fontWeight: 'bold'
		    					}}
		    					name = 'login'
		    					type = 'AntDesign'/>{'\n'}
		    					LOGIN
		    			</Text>
		    		</TouchableWithoutFeedback>

		    		<TouchableWithoutFeedback
		    			onPress={()=>this.props.doChangeMainAppDisplay(Constants.APP_PAGES.SIGN_APP_PAGE)}>
		    			<Text style={{
		    					height: '12.5%',
		    					width: '20.8%',
		    					borderRadius: 100,
		    					position:'absolute',
		    					left: '53.7%',
		    					top: '4%',
		    					fontWeight: 'bold',
		    					textAlign: 'center',
		    					textAlignVertical: 'center',
		    					backgroundColor: '#ba0bc6',
		    					borderColor: '#fff',
		    					borderWidth:3,
		    					color: '#000',
		    					fontSize: 12
		    			}}>
		    				<Icon
		    					style={{
		    						fontSize: 30,
		    						fontWeight: 'bold'
		    					}}
		    					name = 'user-plus'
		    					type = 'FontAwesome'/>{'\n'}
		    					USER
		    			</Text>
		    		</TouchableWithoutFeedback>

		    		<TouchableWithoutFeedback
		    			onPress={()=>this.props.doChangeMainAppDisplay(Constants.APP_PAGES.SIGN_RESTAURANT)}>
		    			<Text style={{
		    					height: '12.5%',
		    					width: '20.8%',
		    					borderRadius: 100,
		    					position:'absolute',
		    					left: '31%',
		    					top: '4%',
		    					fontWeight: 'bold',
		    					textAlign: 'center',
		    					textAlignVertical: 'center',
		    					backgroundColor: '#ba0bc6',
		    					borderColor: '#fff',
		    					borderWidth:3,
		    					color: '#000',
		    					fontSize: 11
		    			}}>
		    				<Icon
		    					style={{
		    						fontSize: 30,
		    						fontWeight: 'bold'
		    					}}
		    					name = 'food-fork-drink'
		    					type = 'MaterialCommunityIcons'/>{'\n'}
		    					OWNER
		    			</Text>
		    		</TouchableWithoutFeedback>

		    		<View style={{
		    				height:'73%',
		    				top: '22%',
		    				position: 'relative',
		    				width: '100%',
		    				opacity: 1.2
		    		}}>
		    			{this.getMapDisplay()}
		    		</View>

		    	</View>
		    </React.Fragment>
	    );
  	}
}
