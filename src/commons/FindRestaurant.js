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
import MapView       from 'react-native-maps';
import {Marker}      from 'react-native-maps';

/* -- Custom Components  -- */

import Constants from './Constants.js';
const anonymousUserIcon = require('../img/icon/anonymous-user.png');


export default class FindRestaurant extends Component{

	state  = {
		registeredRestaurants : [],
		tracksViewChanges     : true
	}


	onLoadIcon = ()=>{
		if(anonymousUserIcon){
			setTimeout(()=>{
				this.setState({tracksViewChanges:false});
				console.log('set to false');
			},1500);
		}
	}

	componentDidMount(){
		this.getAllRegisteredRestaurants();
	}

	getAllRegisteredRestaurants = ()=>{
		this.props.doUseFirebaseObject
			.database()
			.ref("RESTAURANT/")
			.on("value",snapshot=>{
				if(snapshot.exists()){
					const initRegisteredRestaurants = [];
					const allRestaurantsWithKey = JSON.parse(JSON.stringify(snapshot.val()));
					Object
						.keys(allRestaurantsWithKey)
						.forEach((resKey)=>{
							initRegisteredRestaurants.push(allRestaurantsWithKey[resKey]);
						});
					this.setState({registeredRestaurants:initRegisteredRestaurants});
				}
			});
	}

	displayAllApprovedRestaurants = ()=>{
		return this.state.registeredRestaurants.map((restaurant)=>{
			if(restaurant.placeStatus == Constants.RESTAURANT_PLACE_STATUS.ACCEPTED && restaurant.location){
				const jsonLocation = JSON.parse(JSON.stringify(restaurant.location));
				return 	<Marker
							tracksViewChanges = {false}
							coordinate={{latitude:jsonLocation.latitude,
					      		longitude:jsonLocation.longitude}}
					      	title = {restaurant.restaurantName} />
			}
		});
	}

	getMapDisplay = ()=>{
		if(this.props.doGetUsersLocation.latitude){
			return	<MapView style = {{height:'100%',width: '100%',borderRadius:20}}
						provider={MapView.PROVIDER_GOOGLE}
			            region = {{
			                latitude       : this.props.doGetUsersLocation.latitude,
			                longitude      : this.props.doGetUsersLocation.longitude,
			                latitudeDelta  : 0.0922*6,
			                longitudeDelta : 0.0421*6,
		                }}>
		                <Marker
		                 	tracksViewChanges = {false}
					      	coordinate={{latitude:this.props.doGetUsersLocation.latitude,
				      			longitude:this.props.doGetUsersLocation.longitude}}
				      		tracksViewChanges={this.state.tracksViewChanges}
					      	title={'Hello Anonymous!'}
					      	description={'Here is your location, register now!'}>

					      	<Image
					      		onLoad={this.onLoadIcon}
					      		source={anonymousUserIcon}
					      		style={{height:35,width:35}}/>
				    	</Marker>
				    	{this.displayAllApprovedRestaurants()}
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
		    	<View style={{
		    				height: '9%',
		    				width: '100%',
		    				position: 'absolute',
		    				backgroundColor: '#555dff'
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
						    backgroundColor: '#fff',
		    				height:'91%',
		    				top: '9%',
		    				width: '100%',
		    				position: 'relative',
		    		}}>
		    			{this.getMapDisplay()}
		    		</View>

		    		<TouchableWithoutFeedback
		    			onPress={()=>this.props.doChangeMainAppDisplay(Constants.APP_PAGES.LOGIN_APP_PAGE)}>
		    			<Text style={{
		    					borderWidth: 1.2,
							    borderColor: '#ddd',
							    borderBottomWidth: 0,
							    shadowColor: '#000',
							    shadowOffset: {
									width: 0,
									height: 5,
								},
								shadowOpacity: 0.34,
								shadowRadius: 6.27,
								elevation: 10,
							    backgroundColor: '#fff',
		    					height:74,
		    					width: 74,
		    					borderRadius: 100,
		    					position:'absolute',
		    					left: '76%',
		    					top: '4%',
		    					fontWeight: 'bold',
		    					textAlign: 'center',
		    					textAlignVertical: 'center',
		    					backgroundColor: '#fff',
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
		    					borderWidth: 1.2,
							    borderColor: '#ddd',
							    borderBottomWidth: 0,
							    shadowColor: '#000',
							    shadowOffset: {
									width: 0,
									height: 5,
								},
								shadowOpacity: 0.34,
								shadowRadius: 6.27,
								elevation: 10,
							    backgroundColor: '#fff',
		    					height:74,
		    					width: 74,
		    					borderRadius: 100,
		    					position:'absolute',
		    					left: '53.7%',
		    					top: '4%',
		    					fontWeight: 'bold',
		    					textAlign: 'center',
		    					textAlignVertical: 'center',
		    					backgroundColor: '#fff',
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
		    					borderWidth: 1.2,
							    borderColor: '#ddd',
							    borderBottomWidth: 0,
							    shadowColor: '#000',
							    shadowOffset: {
									width: 0,
									height: 5,
								},
								shadowOpacity: 0.34,
								shadowRadius: 6.27,
								elevation: 10,
							    backgroundColor: '#fff',
		    					height:74,
		    					width: 74,
		    					borderRadius: 100,
		    					position:'absolute',
		    					left: '31%',
		    					top: '4%',
		    					fontWeight: 'bold',
		    					textAlign: 'center',
		    					textAlignVertical: 'center',
		    					backgroundColor: '#fff',
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
		    		<View style = {{
		    				height: 50,
		    				width: '70%',
		    				borderRadius:15,
		    				position: 'absolute',
		    				borderWidth: 1.2,
						    borderColor: '#ddd',
						    borderBottomWidth: 0,
						    shadowColor: '#000',
						    shadowOffset: {
								width: 0,
								height: 5,
							},
							shadowOpacity: 0.34,
							shadowRadius: 6.27,
							elevation: 10,
						    backgroundColor: '#fff',
						    left: '15%',
						    top: 110,
						    flexDirection: 'row'
		    		}}>	
		    			<Text style ={{
		    					position:'relative',
		    					height: '90%',
		    					width: '15%',
		    					fontSize: 15,
		    					color: '#000',
		    					left: '20%',
		    					textAlign:'center',
		    					textAlignVertical: 'center'
		    			}}>
		    				<Icon
		    					style ={{fontSize:20,color:'#000'}}
		    					name = 'search'
		    					type = 'FontAwesome'/>
		    			</Text>
		    			<View style ={{
	    						height: '90%',
	    						width: '65%',
	    						left:'20%',
	    						position: 'relative',
	    						borderBottomWidth: 2,
	    						borderColor: '#000'
	    				}}>
	    					<TextInput
	    						placeholder = 'Find places' 
	    						style = {{
	    							height:'100%',
	    							width:'100%',
	    							position: 'relative',
	    							fontSize: 14,
	    							textAlignVertical:'center',
	    							paddingLeft: '2%',
	    							color: '#000'
	    						}}/>

	    				</View>
	    				<Text style = {{
	    						height: '90%',
	    						width: '15%',
	    						fontSize: 13,
	    						left: '20%',
	    						color: '#000',
	    						textAlignVertical: 'center',
	    						paddingTop: '2%',
	    						textAlign: 'center'
	    				}}>	
	    					Filter
	    				</Text>
		    		</View>
		    	</View>
		    </React.Fragment>
	    );
  	}
}
