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
	FlatList} 
	from 'react-native';
import {
	Container, 
	Icon,
	Spinner} 
	from 'native-base';
/* -- Custom Components  -- */

import Constants   from '../commons/Constants.js';


export default class BookingsPage extends Component{
	
	state = {
		acceptedRequests       : [],
		requestsFirebaseObject : '',
		loadingData            : true
	}	

	requestListener = ()=>{
		const requestsFirebaseObject = 	this.props.doUseFirebaseObject
											.database()
											.ref("USERS/"+String(this.props.doGetLoggedInformation.accountID)+"/requests")
											.on("value",snapshot=>{
												if(snapshot.exists()){
													const updatedRequestWithKey = JSON.parse(JSON.stringify(snapshot.val()));
													const initAllRequests       = [];
													Object
														.keys(updatedRequestWithKey)
														.forEach((reqKey)=>{
															initAllRequests.push(updatedRequestWithKey[reqKey]);
														});
													this.getAllAcceptedRequests(initAllRequests);
													
												}
												else{
													this.setState({acceptedRequests:[]});
													this.setState({loadingData:false});
												}
											});
		this.setState({requestsFirebaseObject:requestsFirebaseObject});
	}

	componentDidMount(){
		this.requestListener();
	}

	componentWillUnmount(){
		this.props.doUseFirebaseObject
			.database()
			.ref("USERS/"+String(this.props.doGetLoggedInformation.accountID)+"/requests")
			.off("value",this.state.requestsFirebaseObject);
	}

	getAllAcceptedRequests = (requests)=>{
		let initAllAcceptedRequests = 	[];
		initAllAcceptedRequests     = 	requests.map((request)=>{
												if(request.status == Constants.BOOKING_STATUS.BOOKED 
													|| request.status == Constants.BOOKING_STATUS.CLAIMED){
													return request;
												}
											});
		if(initAllAcceptedRequests[0] == undefined){
			this.setState({
				acceptedRequests: [],
				loadingData:false});
		}
		else{
			this.setState({
				acceptedRequests: initAllAcceptedRequests,
				loadingData:false});
		}
		
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
	    					Bookings Made
	    				</Text>
	    			</View>

	    			<View style ={{
	    					height: '85%',
	    					width: '100%',
	    					position: 'relative'
	    			}}>
	    				{
	    					this.state.loadingData == true ? 
	    					<Text style = {{
	    							height: '10%',
	    							width: '100%',
	    							top: '36%',
	    							fontSize: 12,
	    							color: '#000',
	    							fontWeight: 'bold',
	    							textAlign: 'center',
	    							textAlignVertical: 'center'
	    					}}>
	    						Loading requests, please wait..
	    					</Text>:
	    					this.state.acceptedRequests.length == 0 ?
	    					 <Text style = {{
	    							height: '10%',
	    							width: '100%',
	    							top: '36%',
	    							fontSize: 12,
	    							color: '#000',
	    							fontWeight: 'bold',
	    							textAlign: 'center',
	    							textAlignVertical: 'center'
	    					}}>
	    						No accepted or claimed requests yet
	    					</Text>: 
	    					<FlatList
								data = {this.state.acceptedRequests}
								renderItem = {({item}) =>
									<View style = {{ 
											height: 122,
											position: 'relative',
											borderBottomWidth: 3.3,
											width: '95%',
											left: '2.5%',
											marginBottom: 10,
											marginTop   : 10,
											borderColor :'#25ba0b'
									}}>

										<Text style ={{
													height: '13.4%',
													width: '100%',
													textAlignVertical: 'center',
													fontSize: 13,
													color: '#000',
													paddingLeft: '2%',
													top: '1%'
											}}>
												{item.restaurantName}
											</Text>
											<Text style ={{
													height: '27%',
													width: '100%',
													paddingLeft: '2%',
													textAlignVertical: 'center',
													fontSize: 13,
													color: '#000',
													top: '1%'
											}}>
												{item.restaurantAddress}
											</Text>
											<Text style ={{
													height: '13.4%',
													width: '100%',
													paddingLeft: '2%',
													textAlignVertical: 'center',
													fontSize: 13,
													color: '#000',
													top: '1%',
													fontWeight: 'bold'
											}}>
												{'Operating hours: '
													+item.startingHour
													+'-'
													+item.closingHour}
											</Text>
											<View style ={{
													height: '26%',
													width: '100%',
													position: 'relative',
													top: '4.2%',
													justifyContent: 'space-evenly',
													flexDirection: 'row'
											}}>

											</View>

									</View>
								}
								keyExtractor={item=>item.requestkey}/>
	    				}
	    			</View>
	    		</View>
	    	</React.Fragment>
		);
  	}
}