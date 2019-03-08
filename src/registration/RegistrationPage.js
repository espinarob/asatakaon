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


export default class RegistrationPage extends Component{

	state = {
		inputFirstName   : '',
		inputLastName    : '',
		inputAddress     : '',
		inputEmail       : '',
		inputUsername    : '',
		inputPassword    : '',
		inputConfirmPass : '',
		inputGender      : 'Male'
	}
	onGenderChange = (ItemValue,ItemIndex)=>{
		this.setState({inputGender:ItemValue});
	}

	submitCredentials = ()=>{
		if(this.state.inputPassword!=this.state.inputConfirmPass){
			this.props.doSendAReportMessage('Input passwords does not match');
			setTimeout(()=>{
				this.props.doSendAReportMessage('');
			},Constants.REPORT_DISPLAY_TIME);
		}
		else if(this.state.inputFirstName.length == 0){
			this.props.doSendAReportMessage('Please fill in your given first name');
			setTimeout(()=>{
				this.props.doSendAReportMessage('');
			},Constants.REPORT_DISPLAY_TIME);
		}
		else if(this.state.inputLastName.length == 0){
			this.props.doSendAReportMessage('Please fill in your given last name');
			setTimeout(()=>{
				this.props.doSendAReportMessage('');
			},Constants.REPORT_DISPLAY_TIME);
		}
		else if(this.state.inputAddress.length == 0){
			this.props.doSendAReportMessage('Please fill in your address');
			setTimeout(()=>{
				this.props.doSendAReportMessage('');
			},Constants.REPORT_DISPLAY_TIME);
		}
		else if(this.state.inputEmail.length == 0){
			this.props.doSendAReportMessage('Please fill in your e-mail address');
			setTimeout(()=>{
				this.props.doSendAReportMessage('');
			},Constants.REPORT_DISPLAY_TIME);
		}
		else if(this.state.inputUsername.length<Constants.CREDENTIALS_POLICY.MIN_USERNAME){
			this.props.doSendAReportMessage('Username input should be minimum of '+
				Constants.CREDENTIALS_POLICY.MIN_USERNAME+' characters');
			setTimeout(()=>{
				this.props.doSendAReportMessage('');
			},Constants.REPORT_DISPLAY_TIME);
		}
		else if(this.state.inputPassword.length<Constants.CREDENTIALS_POLICY.MIN_PASSWORD){
			this.props.doSendAReportMessage('Password input should be minimum of '+
				Constants.CREDENTIALS_POLICY.MIN_PASSWORD+' characters');
			setTimeout(()=>{
				this.props.doSendAReportMessage('');
			},Constants.REPORT_DISPLAY_TIME);
		}
		else{
			const userData = {
				firstName : this.state.inputFirstName,
				lastName  : this.state.inputLastName,
				address   : this.state.inputAddress,
				email     : this.state.inputEmail,
				username  : this.state.inputUsername,
				password  : this.state.inputPassword,
				gender    : this.state.inputGender
			};

			this.props.doRegisterUser(userData);
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
		    					top: '13%',
		    					borderWidth: 1.8,
		    					fontWeight: 'bold',
		    					fontSize: 20,
		    					borderColor: '#000',
		    					color: '#000',
		    					textAlign: 'center',
		    					textAlignVertical: 'center',
		    					borderRadius: 100
		    			}}>
		    				SIGN-UP USER PAGE
		    			</Text>

		    			<View style={{
				    			height: '73%',
				    			width:'100%',
				    			position: 'absolute',
				    			opacity: 0.9,
				    			top: '24%',
				    			backgroundColor: '#fff'	
				    	}}>
				    	</View>	


				    	<View style={{
		    				height: '4%',
		    				width: '100%',
		    				position: 'relative',
		    				top: '27%',
		    				flexDirection: 'row'
		    			}}>
		    				<Text style={{
		    					color: '#000',
		    					height:'100%',
		    					width: '23%',
		    					left: '100%',
		    					fontSize: 14,
		    					fontWeight:'bold',
		    					textAlign:'center',
		    					textAlignVertical: 'center'
		    				}}>
		    					First Name
		    				</Text>

		    				<Text style={{
		    					color: '#000',
		    					height:'100%',
		    					width: '30%',
		    					left: '520%',
		    					position: 'relative',
		    					fontSize: 14,
		    					fontWeight:'bold'
		    				}}>
		    					Last Name
		    				</Text>
		    			</View>


		    			<View style={{
		    				height: '8%',
		    				width: '100%',
		    				position: 'relative',
		    				top: '27.3%',
		    				flexDirection: 'row'
		    			}}>
		    				<View style={{
		    						height: '100%',
		    						width: '45%',
		    						position: 'relative',
		    						left: '30%',
		    						borderWidth: 2,
		    						borderRadius: 100
		    				}}>
		    					<TextInput
		    						value        = {this.state.inputFirstName}
		    						onChangeText = {(inputFirstName)=>this.setState({inputFirstName:inputFirstName})}
		    						placeholder  = 'place given name'
		    						style={{
		    							height: '100%',
		    							width: '86%',
		    							fontSize: 14,
		    							position:'relative',
		    							left: '7%'
		    						}}/>
		    				</View>

		    				<View style={{
		    						height: '100%',
		    						width: '45%',
		    						position: 'relative',
		    						left: '50%',
		    						borderWidth: 2,
		    						borderRadius: 100
		    				}}>
		    					<TextInput
		    						value        = {this.state.inputLastName}
		    						onChangeText = {(inputLastName)=>this.setState({inputLastName:inputLastName})}
		    						placeholder  = 'place last name'
		    						style={{
		    							height: '100%',
		    							width: '86%',
		    							fontSize: 14,
		    							position:'relative',
		    							left: '7%'
		    						}}/>
		    				</View>
		    			</View>


		    			<View style={{
		    				height: '4%',
		    				width: '100%',
		    				position: 'relative',
		    				top: '30%',
		    				flexDirection: 'row'
		    			}}>
		    				<Text style={{
		    					color: '#000',
		    					height:'100%',
		    					width: '23%',
		    					left: '100%',
		    					fontSize: 14,
		    					fontWeight:'bold',
		    					textAlign:'center',
		    					textAlignVertical: 'center'
		    				}}>
		    					Address
		    				</Text>

		    				<Text style={{
		    					color: '#000',
		    					height:'100%',
		    					width: '30%',
		    					left: '520%',
		    					position: 'relative',
		    					fontSize: 14,
		    					fontWeight:'bold'
		    				}}>
		    					E-mail
		    				</Text>
		    			</View>

		    			<View style={{
		    				height: '8%',
		    				width: '100%',
		    				position: 'relative',
		    				top: '30%',
		    				flexDirection: 'row'
		    			}}>
		    				<View style={{
		    						height: '100%',
		    						width: '45%',
		    						position: 'relative',
		    						left: '30%',
		    						borderWidth: 2,
		    						borderRadius: 100
		    				}}>
		    					<TextInput
		    						value        = {this.state.inputAddress}
		    						onChangeText = {(inputAddress)=>this.setState({inputAddress:inputAddress})}
		    						placeholder  = 'place given address'
		    						style={{
		    							height: '100%',
		    							width: '86%',
		    							fontSize: 14,
		    							position:'relative',
		    							left: '7%'
		    						}}/>
		    				</View>

		    				<View style={{
		    						height: '100%',
		    						width: '45%',
		    						position: 'relative',
		    						left: '50%',
		    						borderWidth: 2,
		    						borderRadius: 100
		    				}}>
		    					<TextInput
		    						value        = {this.state.inputEmail}
		    						onChangeText = {(inputEmail)=>this.setState({inputEmail:inputEmail})}
		    						placeholder = 'registered e-mail'
		    						style={{
		    							height: '100%',
		    							width: '86%',
		    							fontSize: 14,
		    							position:'relative',
		    							left: '7%'
		    						}}/>
		    				</View>
		    			</View>

		    			<View style={{
		    				height: '4%',
		    				width: '100%',
		    				position: 'relative',
		    				top: '33%',
		    				flexDirection: 'row'
		    			}}>
		    				<Text style={{
		    					color: '#000',
		    					height:'100%',
		    					width: '23%',
		    					left: '100%',
		    					fontSize: 14,
		    					fontWeight:'bold',
		    					textAlign:'center',
		    					textAlignVertical: 'center'
		    				}}>
		    					Username
		    				</Text>

		    				<Text style={{
		    					color: '#000',
		    					height:'100%',
		    					width: '30%',
		    					left: '520%',
		    					position: 'relative',
		    					fontSize: 14,
		    					fontWeight:'bold'
		    				}}>
		    					Password
		    				</Text>
		    			</View>

		    			<View style={{
		    				height: '8%',
		    				width: '100%',
		    				position: 'relative',
		    				top: '33%',
		    				flexDirection: 'row'
		    			}}>
		    				<View style={{
		    						height: '100%',
		    						width: '45%',
		    						position: 'relative',
		    						left: '30%',
		    						borderWidth: 2,
		    						borderRadius: 100
		    				}}>
		    					<TextInput
		    						maxLength     = {Constants.CREDENTIALS_POLICY.MAX_USERNAME}
		    						value         = {this.state.inputUsername}
		    						onChangeText  = {(inputUsername)=>this.setState({inputUsername:inputUsername})}
		    						placeholder   = 'create username'
		    						style={{
		    							height: '100%',
		    							width: '86%',
		    							fontSize: 14,
		    							position:'relative',
		    							left: '7%'
		    						}}/>
		    				</View>

		    				<View style={{
		    						height: '100%',
		    						width: '45%',
		    						position: 'relative',
		    						left: '50%',
		    						borderWidth: 2,
		    						borderRadius: 100
		    				}}>
		    					<TextInput
		    						maxLength    = {Constants.CREDENTIALS_POLICY.MAX_PASSWORD}
		    						value        = {this.state.inputPassword}
		    						onChangeText = {(inputPassword)=>this.setState({inputPassword:inputPassword})}
		    						placeholder  = '*******'
		    						secureTextEntry={true}
		    						style={{
		    							height: '100%',
		    							width: '86%',
		    							fontSize: 14,
		    							position:'relative',
		    							left: '7%'
		    						}}/>
		    				</View>
		    			</View>


		    			<View style={{
		    				height: '4%',
		    				width: '100%',
		    				position: 'relative',
		    				top: '35%',
		    				flexDirection: 'row'
		    			}}>
		    				<Text style={{
		    					color: '#000',
		    					height:'100%',
		    					width: '23%',
		    					left: '100%',
		    					fontSize: 14,
		    					fontWeight:'bold',
		    					textAlign:'center',
		    					textAlignVertical: 'center'
		    				}}>
		    					Gender
		    				</Text>

		    				<Text style={{
		    					color: '#000',
		    					height:'100%',
		    					width: '40%',
		    					left: '520%',
		    					position: 'relative',
		    					fontSize: 14,
		    					fontWeight:'bold'
		    				}}>
		    					Confirm Password
		    				</Text>
		    			</View>


		    			<View style={{
		    				height: '8%',
		    				width: '100%',
		    				position: 'relative',
		    				top: '35.5%',
		    				flexDirection: 'row'
		    			}}>
		    				<View style={{
		    						height: '100%',
		    						width: '45%',
		    						position: 'relative',
		    						left: '30%',
		    						borderWidth: 2,
		    						borderRadius: 100
		    				}}>

		    					<Picker
		    						value         = {this.state.inputGender}
		    						onValueChange = {this.onGenderChange} 
						        	style         = {{height:'100%',width:'85%',left:'7.5%'}}>
						        	<Picker.Item 
						        		label='Male'
			        					value='Male'/>
		        					<Picker.Item 
						        		label='Female'
			        					value='Female'/>
						 		</Picker>
		    				</View>

		    				<View style={{
		    						height: '100%',
		    						width: '45%',
		    						position: 'relative',
		    						left: '50%',
		    						borderWidth: 2,
		    						borderRadius: 100
		    				}}>
		    					<TextInput
		    						maxLength    = {Constants.CREDENTIALS_POLICY.MAX_PASSWORD}
		    						value        = {this.state.inputConfirmPass}
		    						onChangeText = {(inputConfirmPass)=>this.setState({inputConfirmPass:inputConfirmPass})}
		    						placeholder  = '*******'
		    						secureTextEntry={true}
		    						style={{
		    							height: '100%',
		    							width: '86%',
		    							fontSize: 14,
		    							position:'relative',
		    							left: '7%'
		    						}}/>
		    				</View>
		    			</View>

		    			<TouchableWithoutFeedback
		    				onPress={()=>this.submitCredentials()}>
			    			<Text style={{
			    					height: '7%',
			    					width:'30%',
			    					left: '35%',
			    					position: 'relative',
			    					top: '28%',
			    					borderWidth:2,
			    					textAlign: 'center',
			    					textAlignVertical: 'center',
			    					borderRadius: 100,
			    					color: '#000',
			    					fontSize: 15,
			    					fontWeight: 'bold'
			    			}}>
			    				Submit
			    			</Text>
			    		</TouchableWithoutFeedback>
		    	</View>
		    </React.Fragment>
	    );
  	}
}
