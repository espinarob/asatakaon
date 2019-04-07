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
import ImagePicker from 'react-native-image-picker';


/* -- Custom Components  -- */
import Constants from '../commons/Constants.js';

export default class OwnersLocation extends Component{

	state = {
		inputNumberOfPersons : '1 Person',
		inputNameOfDish      : '',
		inputDescription     : '',
		selectImageSuccess   : false,
		imagePath            : '',
    	imageHeight          : '',
    	imageWidth           : '',
    	imageFileSize        : '',
    	imageFileName        : 'Select or capture a photo',
    	submitted            : false
	}

	onChangeNumberOfPersons = (ItemValue,ItemIndex)=>{
		this.setState({inputNumberOfPersons:ItemValue});
	}

	checkNameOfDishCharacters = ()=>{
		return this.state.inputNameOfDish.match(/^[A-z0-9]+$/);
	}


	submitMenuInfo = ()=>{
		if(this.state.submitted == true)return;
		else if(this.checkNameOfDishCharacters() == false){
			this.props.doSendAReportMessage('Please input a valid character for the name');
			setTimeout(()=>{
				this.props.doSendAReportMessage('');
			},Constants.REPORT_DISPLAY_TIME);
		}
		else if(this.state.inputNameOfDish.length == 0){
			this.props.doSendAReportMessage('Please input a valid name for the dish');
			setTimeout(()=>{
				this.props.doSendAReportMessage('');
			},Constants.REPORT_DISPLAY_TIME);
		}
		else if(this.state.selectImageSuccess == false){
			this.props.doSendAReportMessage('Please select a valid image file');
			setTimeout(()=>{
				this.props.doSendAReportMessage('');
			},Constants.REPORT_DISPLAY_TIME);
		}
		else{
			const data = {
				filePath        : this.state.imagePath,
				numberOfPersons : this.state.inputNumberOfPersons,
				dishDescription : this.state.inputDescription,
				name            : this.state.inputNameOfDish
			}
			this.setState({submitted:true});
			setTimeout(()=>{
				this.setState({submitted:false});
			},Constants.REPORT_DISPLAY_TIME+1000);
			this.props.doAddANewDish(data);
		}
	}

	selectPhoto = ()=>{
		ImagePicker.showImagePicker(Constants.SELECT_PHOTO_OPTIONS, (response) => {
		  if (response.didCancel) {
		    console.log('User cancelled image picker');
		  }
		  else if (response.error) {
		    console.log('ImagePicker Error: ', response.error);
		  }
		  else if (response.customButton) {
		    console.log('User tapped custom button: ', response.customButton);
		  } 
		  else {
	    	this.setState({
		     	imagePath     : response.uri,
            	imageHeight   : response.height,
            	imageWidth    : response.width,
            	imageFileSize : response.fileSize,
            	imageFileName : response.fileName
		    });
		    if(response.fileSize>Constants.LOCAL_IMAGE_FILE_SIZE_LIMIT){
		    	this.setState({imageFileName:'File size exceeds'+
		    		String(Number(Constants.LOCAL_IMAGE_FILE_SIZE_LIMIT)/1000)+'MB limit'});
		    	this.setState({selectImageSuccess:false});
		    }
		    else{
			    if(response.type){
			    	if(response.type == 'image/jpeg' || response.type == 'jpeg' ||  
			    		response.type == 'image/jpg'){
			    		this.setState({
				    		imageType          : response.type,
				    		imageFileName      : response.fileName,
				    		selectImageSuccess : true
				    	});
			    	}
			    	else{
				    	this.setState({
				    		imageType          : 'invalid',
				    		selectImageSuccess : false,
				    		imageFileName      : 'Selected image is not supported'
				    	});
				    }
			    }
			    else{
			    	this.setState({
			    		imageType          : 'invalid',
			    		selectImageSuccess : false,
			    		imageFileName      : 'Selected image is not supported'
			    	});
			    }
			}
		  
		  }
		});
	}

	render() {
	    return (
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
								height: 5,
							},
							shadowOpacity: 0.34,
							shadowRadius: 6.27,
							elevation: 9,
						    backgroundColor: '#555dff',
						    flexDirection: 'row'
	    			}}>
	    				<TouchableWithoutFeedback
	    					onPress={()=>this.props.doSetHomePage(Constants.OWNER_ROLE_PAGES.RESTAURANT_INFO)}>
		    				<Text style={{
			    					height: '50%',
			    					width: '18%',
			    					position: 'relative',
			    					color: '#000',
			    					fontSize: 13,
			    					fontWeight: 'bold',
			    					textAlign: 'center',
			    					textAlignVertical: 'center',
			    					borderRadius: 100,
			    					borderWidth:2,
			    					left: '10%',
			    					top: '3%'
			    			}}>
			    				RETURN
			    			</Text>
			    		</TouchableWithoutFeedback>

	    				<Text style={{
	    						height:'100%',
	    						width:'70%',
	    						textAlign:'center',
	    						textAlignVertical:'center',
	    						fontSize:15,
	    						fontWeight:'bold',
	    						color:'#000',
	    						left: '28%'
	    				}}>
	    					Add a new dish in your menu
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
		    				height: '75%',
		    				width:'90%',
		    				position: 'relative',
		    				elevation: 11,
							top: '5%',
						    alignItems: 'center',
						    paddingTop: '5%',
						    borderRadius: 25
	    			}}>
	    				<Text style = {{
	    						height: '7%',
	    						width: '50%',
	    						position: 'relative',
	    						fontSize: 15,
	    						fontWeight: 'bold',
	    						textAlign: 'center',
	    						textAlignVertical : 'center',
	    						color: '#000'
	    				}}>
	    					Name of Dish
	    				</Text>
	    				<Text style = {{
	    						height: '5.3%',
	    						width: '100%',
	    						position: 'relative',
	    						fontSize: 13,
	    						textAlign: 'center',
	    						textAlignVertical : 'center',
	    						color: '#000'
	    				}}>
	    					{'Maximum of '+Constants.CREDENTIALS_POLICY.MAX_FOOD_MENU+' input characters only'}
	    				</Text>
	    				<View style={{
		    					height:'11%',
		    					width: '60%',
		    					borderRadius: 100,
		    					position: 'relative',
		    					borderWidth:2,
		    					alignItems:'center'
		    			}}>
		    				<TextInput
		    					placeholder = 'create name of dish'
		    					style={{
		    						width:'90%',
		    						height:'100%',
		    						textAlign:'center',
		    						textAlignVertical:'center'
		    					}}
		    					maxLength = {Constants.CREDENTIALS_POLICY.MAX_FOOD_MENU}
		    					onChangeText={(inputNameOfDish)=>this.setState({inputNameOfDish})}/>
	    				</View>

	    				<Text style = {{
	    						height: '7%',
	    						width: '50%',
	    						position: 'relative',
	    						fontSize: 15,
	    						fontWeight: 'bold',
	    						textAlign: 'center',
	    						textAlignVertical : 'center',
	    						color: '#000',
	    						top: '2%'
	    				}}>
	    					Description 
	    				</Text>
	    				<Text style = {{
	    						height: '5%',
	    						width: '100%',
	    						position: 'relative',
	    						fontSize: 13,
	    						textAlign: 'center',
	    						textAlignVertical : 'center',
	    						color: '#000',
	    						top: '2%'
	    				}}>
	    					{'(Optional)Maximum of '+Constants.CREDENTIALS_POLICY.MAX_DISH_DESCRIPTION+' input characters only'}
	    				</Text>
	    				<View style={{
		    					height:'11%',
		    					width: '60%',
		    					borderRadius: 100,
		    					position: 'relative',
		    					borderWidth:2,
		    					alignItems:'center',
		    					top: '2%'
		    			}}>
		    				<TextInput
		    					placeholder = 'description of your dish'
		    					style={{
		    						width:'90%',
		    						height:'100%',
		    						textAlign:'center',
		    						textAlignVertical:'center'
		    					}}
		    					maxLength = {Constants.CREDENTIALS_POLICY.MAX_DISH_DESCRIPTION}
		    					onChangeText={(inputDescription)=>this.setState({inputDescription})}/>
	    				</View>
	    				<View style={{
		    					height:'12%',
		    					width: '100%',
		    					position: 'relative',
		    					flexDirection: 'row',
		    					top: '4%'
		    			}}>
		    				<Text style = {{
		    						height: '100%',
		    						textAlignVertical: 'center',
		    						textAlign: 'center',
		    						position : 'relative',
		    						left: 10,
		    						width: '25%',
		    						fontSize: 15,
		    						fontWeight: 'bold',
		    						color: '#000'
		    				}}>
		    					Good for: 
		    				</Text>
		    				<View style = {{
		    						width: '55%',
		    						height: '100%',
		    						position: 'relative',
		    						borderRadius: 100,
		    						borderWidth: 2,
		    						left: 10
		    				}}>
		    					<Picker
		    						selectedValue = {this.state.inputNumberOfPersons}
		    						onValueChange = {this.onChangeNumberOfPersons}
						        	style={{height:'100%',width:'100%',position:'relative'}}
						        	itemStyle = {{textAlign: 'center',fontSize:15}}
						        	>
					        		<Picker.Item 
					        			label={'1 Person'} 
		        						value={'1 Person'}/>
		        					<Picker.Item 
					        			label={'1-2 Persons'} 
		        						value={'1-2 Persons'}/>
		        					<Picker.Item 
					        			label={'3 Persons'} 
		        						value={'3 Persons'}/>
		        					<Picker.Item 
					        			label={'3-4 Persons'} 
		        						value={'3-4 Persons'}/>
		        					<Picker.Item 
					        			label={'5 Persons or more'} 
		        						value={'5 Persons or more'}/>
		        				</Picker>
		    				</View>
		    			</View>

		    			<View style={{
		    					height:'12%',
		    					width: '100%',
		    					position: 'relative',
		    					flexDirection: 'row',
		    					top: '6%'
		    			}}>
		    				<TouchableWithoutFeedback
		    					onPress = {()=>this.selectPhoto()}>
			    				<Text style={{
		    							height: '90%',
				    					width:'35%',
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
									    left: 10,
									    color: '#000'
		    					}}>
		    						Upload Photo
		    					</Text>
		    				</TouchableWithoutFeedback>
	    					<Text style = {{ 
	    						height: '100%',
	    						position: 'relative',
	    						left: 15,
	    						fontSize: 12,
	    						width: '55%',
	    						textAlignVertical: 'center',
	    						textAlign: 'center',
	    						color: '#000'
	    					}}>
	    						{this.state.imageFileName}
	    					</Text>
		    			</View>
		    			<TouchableWithoutFeedback
		    				onPress = {()=>this.submitMenuInfo()}>
			    			<Text style={{
	    							height: '12%',
			    					width:'40%',
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
								    top: '12%',
								    fontSize: 15,
								    color: '#000'
	    					}}>
	    						Submit
			    			</Text>	
			    		</TouchableWithoutFeedback>
	    			</View>
	    		</View>
	    	</React.Fragment>
		);
  	}
}