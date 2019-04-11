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
	CheckBox,
	ScrollView} 
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


export default class OwnersRestaurant extends Component{
	
	editRestaurantAddress = ()=>{
		if(this.props.doGetLoggedInformation.location){
			this.props.doSendAReportMessage('Already edited once, send us a message or a report');
			setTimeout(()=>{
				this.props.doSendAReportMessage('');
			},Constants.REPORT_DISPLAY_TIME);
		}
		else{
			this.props.doSetHomePage(Constants.OWNER_ROLE_PAGES.RESTAURANT_LOCATION);
		}
	}

	componentDidMount(){

	}

	render() {
	    return (
	    	<React.Fragment>
	    		<View style= {{
		    			height: '100%',
		    			width: '100%',
		    			position: 'absolute',
		    			backgroundColor: '#fff'
		    	}}>
		    	</View>
	    		<View style={{
	    				height:'100%',
	    				width:'100%',
	    				position:'relative',
	    				alignItems:'center'
	    		}}>
	    			<View style={{
	    					height: '8.5%',
	    					width:'100%',
	    					position:'relative',
						    borderColor: '#ddd',
						    borderBottomWidth: 0,
						    shadowColor: '#000',
						    shadowOffset: {
								width: 0,
								height: 5,
							},
							shadowOpacity: 0.34,
							shadowRadius: 6.27,
							elevation: 9,
						    backgroundColor: '#555dff'
	    			}}>
	    				<Text style={{
	    						height:'100%',
	    						width:'100%',
	    						textAlign:'center',
	    						textAlignVertical:'center',
	    						fontSize:15,
	    						fontWeight:'bold',
	    						color:'#000'
	    				}}>
	    					Restaurant Information
	    				</Text>
	    			</View>

	    			<View style={{
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
	    				height: '68%',
	    				width:'90%',
	    				position: 'relative',
	    				elevation: 11,
						top: '5.5%',
					    alignItems: 'center',
					    paddingTop: '5%',
					    borderRadius: 25
	    			}}>
	    				<ScrollView 
	    					style = {{width:'100%'}}
		    				contentContainerStyle = {{alignItems:'center',paddingBottom: 30}}>
		    				<View style = {{
		    						height: 115,
		    						width: '90%',
		    						position: 'relative',
		    						flexDirection: 'row'
		    				}}>
		    					<Text style ={{
		    							height: '100%',
		    							position: 'absolute',
		    							width: '43%',
		    							backgroundColor: '#8f9091',
		    							textAlign: 'center',
		    							textAlignVertical:'center',
		    							fontSize: 13,
		    							fontStyle: 'italic'
		    					}}>	
		    						{ this.props.doGetLoggedInformation.displayIMG ? 
		    							'Loading image..':'No added image'}
		    					</Text>
		    					{
		    						this.props.doGetLoggedInformation.displayIMG ?
		    						<Image
		    							source = {{uri:this.props.doGetLoggedInformation.displayIMG}}
		    							style  = {{
		    								height:'100%',
		    								width:'100%',
		    								position:'relative',
		    								resizeMode: 'contain'
		    							}}/> : <View style = {{height:'100%',width:'43%',position:'relative'}}></View>
		    					}
		    					<View style = {{
		    							position: 'relative',
		    							height: '100%',
		    							width: '56%'
		    					}}>
		    						<Text style = {{
		    								height:'16%',
		    								width: '100%',
		    								position: 'relative',
		    								fontSize: 13,
		    								fontStyle: 'italic',
		    								color: '#000',
		    								paddingLeft: '2%',
		    								top: '7%'
		    						}}>
		    							You may select an image
		    						</Text>

		    						<Text style ={{
		    								height: '25%',
		    								width: '65%',
		    								position:'relative',
					    					borderColor: '#ddd',
										    borderBottomWidth: 0,
										    shadowColor: '#000',
										    shadowOffset: {
												width: 0,
												height: 2,
											},
											shadowOpacity: 0.34,
											elevation: 6,
										    backgroundColor: '#fff',
										    top: '12%',
										    color: '#000',
										    textAlignVertical: 'center',
										    textAlign: 'center',
										    left: '17%',
										    borderRadius: 15
		    						}}>
		    							Update image
		    						</Text>
		    					</View>
		    				</View>
		    				<View style = {{
		    						height: 50,
		    						width: '90%',
		    						position: 'relative',
		    						flexDirection: 'row'
		    				}}>
		    					<Text style = {{
		    							height: '100%',
		    							width: '30%',
		    							position: 'relative',
		    							textAlign: 'center',
		    							textAlignVertical: 'center',
		    							fontSize : 14,
		    							color: '#000'
		    					}}>
		    						Restaurant Name:
		    					</Text>
		    					<Text style = {{
		    							height: '100%',
		    							width: '55%',
		    							position: 'relative',
		    							textAlignVertical: 'center',
		    							fontSize : 13,
		    							color: '#000',
		    							paddingLeft: '2%'
		    					}}>
		    						{this.props.doGetLoggedInformation.restaurantName}
		    					</Text>
		    				</View>
		    				<View style = {{
		    						height: 50,
		    						width: '90%',
		    						position: 'relative',
		    						flexDirection: 'row',
		    				}}>
		    					<Text style = {{
		    							height: '100%',
		    							width: '30%',
		    							position: 'relative',
		    							textAlign: 'center',
		    							textAlignVertical: 'center',
		    							fontSize : 14,
		    							color: '#000'
		    					}}>
		    						Restaurant Status:
		    					</Text>
		    					<Text style = {{
		    							height: '100%',
		    							width: '55%',
		    							position: 'relative',
		    							textAlignVertical: 'center',
		    							fontSize : 13,
		    							color: '#000',
		    							paddingLeft: '2%'
		    					}}>
		    						{( this.props.doGetLoggedInformation.placeStatus == 
		    							Constants.RESTAURANT_PLACE_STATUS.BLOCKED ? 
		    							'Pending for admin confirmation' : 'Successfully validated')}
		    					</Text> 
		    				</View>
		    				<View style = {{
		    						height: 62,
		    						width: '90%',
		    						position: 'relative',
		    						flexDirection: 'row',
		    						marginBottom: 3
		    				}}>
		    					<Text style = {{
		    							height: '100%',
		    							width: '30%',
		    							position: 'relative',
		    							textAlign: 'center',
		    							textAlignVertical: 'center',
		    							fontSize : 14,
		    							color: '#000'
		    					}}>
		    						Current Location: 
		    					</Text>
		    					<Text style = {{
		    							height: '100%',
		    							width: '57%',
		    							position: 'relative',
		    							textAlignVertical: 'center',
		    							fontSize : 13,
		    							color: '#000',
		    							paddingLeft: '2%'
		    					}}>
		    						{(this.props.doGetLoggedInformation.location) ? 
		    							this.props.doGetLoggedInformation.location.addressName : 'Not updated yet\n(Warning: update only work once)' }
		    					</Text>
		    				</View>
		    				<View style = {{
		    						height: 62,
		    						width: '90%',
		    						position: 'relative',
		    						flexDirection: 'row',
		    						marginBottom: 3
		    				}}>
		    					<Text style = {{
		    							height: '100%',
		    							width: '30%',
		    							position: 'relative',
		    							textAlign: 'center',
		    							textAlignVertical: 'center',
		    							fontSize : 14,
		    							color: '#000'
		    					}}>
		    						Business Hours:  
		    					</Text>
		    					<Text style = {{
		    							height: '100%',
		    							width: '57%',
		    							position: 'relative',
		    							textAlignVertical: 'center',
		    							fontSize : 13,
		    							color: '#000',
		    							paddingLeft: '2%'
		    					}}>
		    						{' '+this.props.doGetLoggedInformation.startingHour+' to '+
		    						this.props.doGetLoggedInformation.closingHour}
		    					</Text>
		    				</View>
		    				<View style = {{
		    						height: 50,
		    						width: '90%',
		    						position: 'relative',
		    						top:10,
		    						paddingBottom: 5,
		    						alignItems: 'center'
		    				}}>
		    					<TouchableWithoutFeedback
		    						onPress={()=>this.editRestaurantAddress()} >
			    					<Text style={{
			    							height: '90%',
					    					width:'50%',
					    					position:'relative',
					    					borderColor: '#ddd',
										    borderBottomWidth: 0,
										    shadowColor: '#000',
										    shadowOffset: {
												width: 0,
												height: 2,
											},
											shadowOpacity: 0.34,
											elevation: 6,
										    backgroundColor: '#fff',
										    textAlignVertical: 'center',
										    textAlign: 'center',
										    fontWeight :'bold',
										    borderRadius : 15,
										    color: '#000'
			    					}}>
			    						Edit Location
			    					</Text>
			    				</TouchableWithoutFeedback>
		    				</View>

		    				<View style = {{
		    						height: 50,
		    						width: '90%',
		    						position: 'relative',
		    						top: 15,
		    						alignItems: 'center'
		    				}}>
		    					<TouchableWithoutFeedback
		    						onPress = {()=>this.props.doSetHomePage(Constants.OWNER_ROLE_PAGES.ADD_FOOD_MENU)}>
			    					<Text style={{
			    							height: '90%',
					    					width:'50%',
					    					position:'relative',
					    					borderWidth: 1.2,
										    borderColor: '#ddd',
										    borderBottomWidth: 0,
										    shadowColor: '#000',
										    shadowOffset: {
												width: 0,
												height: 2,
											},
											shadowOpacity: 0.34,
											elevation: 6,
										    backgroundColor: '#fff',
										    textAlignVertical: 'center',
										    textAlign: 'center',
										    fontWeight :'bold',
										    borderRadius : 15,
										    color: '#000'
			    					}}>
			    						Add New Dish
			    					</Text>
			    				</TouchableWithoutFeedback>
		    				</View>
		    				<View style = {{
		    						height: 50,
		    						width: '90%',
		    						position: 'relative',
		    						top: 20,
		    						alignItems: 'center'
		    				}}>
		    					<TouchableWithoutFeedback
		    						onPress = {()=>this.props.doSetHomePage(Constants.OWNER_ROLE_PAGES.VIEW_FOOD_MENU)}>
			    					<Text style={{
			    							height: '90%',
					    					width:'50%',
					    					position:'relative',
					    					borderWidth: 1.2,
										    borderColor: '#ddd',
										    borderBottomWidth: 0,
										    shadowColor: '#000',
										    shadowOffset: {
												width: 0,
												height: 2,
											},
											shadowOpacity: 0.34,
											elevation: 6,
										    backgroundColor: '#fff',
										    textAlignVertical: 'center',
										    textAlign: 'center',
										    fontWeight :'bold',
										    borderRadius : 15,
										    color: '#000'
			    					}}>
			    						View Food Menu
			    					</Text>
			    				</TouchableWithoutFeedback>
		    				</View>

	    				</ScrollView>
	    				<Text 
			    			style={{
			    				height:'9%',
			    				width:'11%',
			    				position:'absolute',
			    				textAlign: 'center',
			    				textAlignVertical:'center',
			    				top: '96%',
			    				left: '3%'
			    		}}>
			    			<Icon
			    				style={{fontSize:30,color:'#000'}}
			    				name = 'ios-arrow-down'
			    				type = 'Ionicons'/>

			    		</Text>
	    			</View>
	    		</View>
	    	</React.Fragment>
		);
  	}
}
