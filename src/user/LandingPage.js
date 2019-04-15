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
import SyncStorage       from 'sync-storage';
import MapView           from 'react-native-maps';
import {Marker,Polyline} from 'react-native-maps';
import Geolocation       from 'react-native-geolocation-service';
import getDirections from 'react-native-google-maps-directions'
/* -- Custom Components  -- */
import Constants from '../commons/Constants.js';


const registeredUserIcon = require('../img/icon/anonymous-user.png');
const restaurantIcon     = require('../img/icon/restaurant-own.png');

export default class UserHomePage extends Component{

	state  = {
		registeredRestaurants     : [],
		pressedRestaurantDetails  : {},
		tracksViewChangesUserIcon : true,
		tracksViewChangesResIcon  : true,
		restaurantObjectListener  : ''
	}


	componentDidMount(){
		this.getAllRegisteredRestaurants();
	}

	componentWillUnmount(){
		this.props.doUseFirebaseObject
			.database()
			.ref("RESTAURANT/")
			.off("value",this.state.restaurantObjectListener);
	}

	getAllRegisteredRestaurants = ()=>{
		const firebaseKey = 	this.props.doUseFirebaseObject
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
		this.setState({restaurantObjectListener:firebaseKey});
	}

	onLoadIcon = ()=>{
		if(registeredUserIcon){
			setTimeout(()=>{
				this.setState({tracksViewChangesUserIcon:false});
				console.log('set to false');
			},1500);
		}
	}

	onLoadRestaurantIcon = ()=>{
		if(restaurantIcon && this.state.tracksViewChangesResIcon!=false){
			setTimeout(()=>{
				this.setState({tracksViewChangesResIcon:false});
				console.log('set to false');
			},1500)
		}
	}

	displaySearchBar = ()=>{
		return 	<View style={{
						height:'9%',
						width:'80%',
						left: '10%',
						top: '8%',
						position:'absolute',
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
					    borderRadius:15,
					    flexDirection: 'row'
				}}>
					<Text style={{
							height:'100%',
							position: 'relative',
							width: '17%',
							fontSize: 15,
							textAlign: 'center',
							textAlignVertical: 'center'
					}}>
						<Icon
							style = {{
								fontSize:25,
								color: '#000'
							}}
							name  = 'ios-notifications'
							type  = 'Ionicons'/>
					</Text>
					<Text style={{
							height:'100%',
							position: 'relative',
							width: '11%',
							fontSize: 15,
							textAlignVertical: 'center'
					}}>
						<Icon
							style = {{
								fontSize:25,
								color: '#000'
							}}
							name  = 'md-search'
							type  = 'Ionicons'/>
					</Text>
					<TextInput
						placeholder = 'Search something..'
						style ={{
							fontSize: 15,
							width: '53%',
							position:'relative',
							height: '90%',
							paddingLeft:'3%',
							borderBottomWidth: 2
						}}/>
					<Text style ={{
							height: '90%',
							position: 'relative',
							top: '2.3%',
							width: '14%',
							textAlignVertical:'center',
							textAlign: 'center',
							fontSize: 14,
							fontWeight:'bold',
							color: '#000',
							left:6
					}}>
						Filter
					</Text>
				</View>
	}

	containPressRestaurantDetails = (restaurant)=>{
		if(!restaurant.Menu){
			this.setState({pressedRestaurantDetails:restaurant});
			return;
		}
		else this.setState({pressedRestaurantDetails:restaurant});

		const menuWithKey = JSON.parse(JSON.stringify(restaurant.Menu));
		const initPressedCreatedMenu = [];

		Object
			.keys(menuWithKey)
			.forEach((menKeys)=>{
				initPressedCreatedMenu.push(menuWithKey[menKeys]);
			});
		this.setState({pressedCreatedMenu:initPressedCreatedMenu});
	}

	displayAllApprovedRestaurants = ()=>{
		return this.state.registeredRestaurants.map((restaurant)=>{
			if(restaurant.placeStatus == Constants.RESTAURANT_PLACE_STATUS.ACCEPTED && restaurant.location){
				const jsonLocation = JSON.parse(JSON.stringify(restaurant.location));
				return 	<Marker
							key     = {restaurant.key}
							onPress = {()=>this.containPressRestaurantDetails(restaurant)}
							tracksViewChanges = {this.state.tracksViewChangesResIcon}
							coordinate = {{latitude:jsonLocation.latitude,
					      		longitude:jsonLocation.longitude}}
					      	title = {restaurant.restaurantName}
					      	description = {'Operating hours: '
					      		+restaurant.startingHour
					      		+'-'+restaurant.closingHour} >
					      	<Image
					      		onLoad={this.onLoadRestaurantIcon}
					      		source={restaurantIcon}
					      		style={{height:40,width:40}}/>
				      	</Marker>;
			}
		});
	}


	viewRestaurantDetails = ()=>{
		this.props.doSetRestaurantDetails(this.state.pressedRestaurantDetails);
		this.props.doSetHomePage(Constants.USER_ROLE_PAGES.RESTAURANT_DETAILS);
	}

	navigateToPressedRestaurant = ()=>{
		this.props.doSendAReportMessage('Navigating to your destination, please wait..');
		const data = {
			source : {
				latitude  : this.props.doGetUsersLocation.latitude,
				longitude : this.props.doGetUsersLocation.longitude
			},
			destination : {
				latitude  : this.state.pressedRestaurantDetails.location.latitude,
				longitude : this.state.pressedRestaurantDetails.location.longitude
			},
			params : [
				{
	          		key: "travelmode",
	          		value: "driving"        // may be "walking", "bicycling" or "transit" as well
		        },
		        {
	          		key: "dir_action",
	          		value: "navigate"       // this instantly initializes navigation using the given travel mode 
		        }
			]
		}
		getDirections(data);

		setTimeout(()=>{
			this.setState({pressedRestaurantDetails:{}});
			this.props.doSendAReportMessage('');
		},Constants.REPORT_DISPLAY_TIME);
	}

	showDetailsOfRestaurant = ()=>{
		if(this.state.pressedRestaurantDetails.location){
			return 	<View style ={{
		    				height: 173,
		    				width: '75%',
		    				position: 'absolute',
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
		    				top: '23%',
		    				borderRadius: 15,
		    				alignItems: 'center'
		    		}}>

		    			<View style ={{
		    					height: '50%',
		    					width: '100%',
		    					top: '10.4%',
		    					position:'relative',
		    					flexDirection: 'row'
		    			}}>
		    				{
		    					this.state.pressedRestaurantDetails.displayIMG ?
		    					<Text style ={{
		    							height: '100%',
		    							width:'44%',
		    							position:'absolute',
		    							textAlignVertical:'center',
		    							textAlign:'center',
		    							color: '#000',
		    							fontSize: 11,
		    							fontStyle: 'italic'
		    					}}>
		    						Loading..
		    					</Text>:
		    					<Text style ={{
		    							height: '100%',
		    							width:'44%',
		    							position:'absolute',
		    							textAlignVertical:'center',
		    							textAlign:'center',
		    							color: '#000',
		    							fontSize: 11,
		    							fontStyle: 'italic'
		    					}}>
		    						No image
		    					</Text>
		    				}
		    				{
		    					this.state.pressedRestaurantDetails.displayIMG ?
		    					<Image
		    						source = {{uri:this.state.pressedRestaurantDetails.displayIMG}}
		    						style = {{
		    							height: '100%',
		    							width:'47%',
		    							position:'relative',
		    							resizeMode: 'contain'
		    						}}/>:
		    					<React.Fragment></React.Fragment>
		    				}
		    				<View style ={{
		    						height: '100%',
		    						width: '51%',
		    						position:'relative'
		    				}}>
		    					<Text style ={{
		    							height:'20%',
		    							width:'100%',
		    							paddingLeft: '2%',
		    							textAlignVertical:'center',
		    							color: '#000',
		    							fontSize:11,
		    							fontWeight: 'bold'
		    					}}>
		    						{
		    							this.state.pressedRestaurantDetails.acceptBooking == 'true' ?
		    							'We accept bookings' : 'Does not accept bookings'
		    						}
		    					</Text>
		    					<Text style ={{
		    							height:'27.5%',
		    							width:'100%',
		    							paddingLeft: '2%',
		    							textAlignVertical:'center',
		    							color: '#000',
		    							fontSize:11
		    					}}>
		    						{this.state.pressedRestaurantDetails.restaurantName}
		    					</Text>
		    					<Text style ={{
		    							height:'40%',
		    							width:'100%',
		    							paddingLeft: '2%',
		    							textAlignVertical:'center',
		    							color: '#000',
		    							fontSize:12
		    					}}>
		    						{'Operating hour: '
		    							+this.state.pressedRestaurantDetails.startingHour
		    							+'-'
		    							+this.state.pressedRestaurantDetails.closingHour}
		    					</Text>
		    				</View>
		    			</View>
		    			<View style ={{
		    					height: '19%',
		    					width:'100%',
		    					flexDirection: 'row',
		    					justifyContent: 'space-evenly',
		    					top:'17%'
		    			}}>
		    				<TouchableWithoutFeedback
			    				onPress = {()=>this.navigateToPressedRestaurant()}>
				    			<Text style ={{
			    						height: '100%',
			    						width:'35%',
			    						textAlignVertical : 'center',
			    						textAlign : 'center',
			    						fontSize:14,
			    						fontWeight: 'bold',
			    						borderRadius: 100,
			    						color: '#000',
			    						position: 'relative',
			    						borderColor: '#ddd',
									    borderBottomWidth: 0,
									    shadowColor: '#000',
									    shadowOffset: {
											width: 0,
											height: 5,
										},
										shadowOpacity: 0.34,
										shadowRadius: 3.27,
										elevation: 10,
									    backgroundColor: '#fff'
			    				}}>
			    					Navigate
			    				</Text>
			    			</TouchableWithoutFeedback>

		    				<TouchableWithoutFeedback
			    				onPress = {()=>this.viewRestaurantDetails()}>
				    			<Text style ={{
			    						height: '100%',
			    						width:'35%',
			    						textAlignVertical : 'center',
			    						textAlign : 'center',
			    						fontSize:14,
			    						fontWeight: 'bold',
			    						borderRadius: 100,
			    						color: '#000',
			    						position: 'relative',
			    						borderColor: '#ddd',
									    borderBottomWidth: 0,
									    shadowColor: '#000',
									    shadowOffset: {
											width: 0,
											height: 5,
										},
										shadowOpacity: 0.34,
										shadowRadius: 3.27,
										elevation: 10,
									    backgroundColor: '#fff'
			    				}}>
			    					View
			    				</Text>
			    			</TouchableWithoutFeedback>
		    			</View>
		    			
		    			<TouchableWithoutFeedback
		    				onPress={()=>this.setState({pressedRestaurantDetails:{}})}>
			    			<Text style ={{
			    					height: '10.5%',
			    					width: '12%',
			    					position:'absolute',
			    					top: '2%',
			    					left: '2%',
			    					textAlign:'center',
			    					textAlignVertical: 'center'
			    			}}>
			    				<Icon
			    					style ={{fontSize:19}}
			    					name = 'closesquare'
			    					type = 'AntDesign'/>
			    			</Text>
			    		</TouchableWithoutFeedback>
		    		</View>
    	}
    	else return;
    }

	showMapToUser = ()=>{
		if(this.props.doGetUsersLocation.latitude){
			return	<MapView style = {{height:'100%',width: '100%'}}
						provider={MapView.PROVIDER_GOOGLE}
			            region = {{
			                latitude       : this.props.doGetUsersLocation.latitude,
			                longitude      : this.props.doGetUsersLocation.longitude,
			                latitudeDelta  : 0.0922*1,
			                longitudeDelta : 0.0421*1,
		                }}>
		                <Marker
					      	coordinate={{latitude:this.props.doGetUsersLocation.latitude,
				      			longitude:this.props.doGetUsersLocation.longitude}}
				      		tracksViewChanges={this.state.tracksViewChangesUserIcon}
					      	title={'Hello User!'}
					      	description={'Here is your location, you may now book!'}>

					      	<Image
					      		onLoad={this.onLoadIcon}
					      		source={registeredUserIcon}
					      		style={{height:36,width:36}}/>
				    	</Marker>
				    	{this.displayAllApprovedRestaurants()}
        			</MapView>
		}
		else{
			return 	<Text style={{
							height: '7%',
							position:'relative',
							top: '35%',
							width:'100%',
							fontSize: 14,
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
	    		<View style = {{
	    			height: '100%',
	    			width:'100%',
	    			position:'relative',
	    			alignItems:'center'
	    		}}>
	    			{this.showMapToUser()}
	    			{this.showDetailsOfRestaurant()}
	    		</View>
	    		{this.displaySearchBar()}
	    	</React.Fragment>
		);
  	}
}
