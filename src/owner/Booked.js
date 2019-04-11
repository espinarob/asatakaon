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
	FlatList,
	ScrollView} 
	from 'react-native';
import {
	Container, 
	Icon,
	Spinner} 
	from 'native-base';
/* -- Custom Components  -- */
import Constants from '../commons/Constants.js';

export default class Booked extends Component{

	render(){
		return(
			<React.Fragment>
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
								height: 0,
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
	    					Booked Users
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
		    				height: '65%',
		    				width:'90%',
		    				position: 'relative',
		    				elevation: 11,
							top: '5%',
						    alignItems: 'center',
						    paddingTop: '5%',
						    borderRadius: 25
	    			}}>	
	    				
	    			</View>
	    		</View>
			</React.Fragment>
		);
	}
}	