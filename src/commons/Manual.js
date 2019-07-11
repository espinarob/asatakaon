import React, { Component } from "react";
import Constants from "./Constants";
import { Text, View, TouchableWithoutFeedback, ScrollView } from "react-native";
import { Icon } from "native-base";

export default class Manual extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <View
          style={{
            height: "9%",
            width: "100%",
            position: "absolute",
            backgroundColor: "#555dff"
          }}
        >
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.doChangeMainAppDisplay(
                Constants.APP_PAGES.WELCOME_APP_PAGE
              )
            }
          >
            <Text
              style={{
                height: "50%",
                width: "18%",
                position: "relative",
                borderWidth: 2,
                color: "#000",
                fontSize: 13,
                fontWeight: "bold",
                textAlign: "center",
                textAlignVertical: "center",
                borderRadius: 100,
                top: "20%",
                left: "2%"
              }}
            >
              RETURN
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
            alignItems: "center"
          }}
        >
          <View
            style={{
              borderWidth: 1.2,
              borderColor: "#ddd",
              borderBottomWidth: 0,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
              backgroundColor: "#fff",
              height: "70%",
              width: "90%",
              borderWidth: 2,
              borderRadius: 20,
              top: "16%",
              paddingTop: "5%"
            }}
          >
            <ScrollView
              style={{ width: "100%" }}
              contentContainerStyle={{ alignItems: "center" }}
            >
              <Text
                style={{
                  width: "90%",
                  position: "relative",
                  textAlign: "center",
                  fontSize: 14,
                  fontColor: "#000000",
                  justifyContent: "center",
                  fontWeight: "bold"
                }}
              >{`Hello! Welcome to our app called “Asa ta kaon?”`}</Text>
              <Text
                style={{
                  width: "90%",
                  position: "relative",
                  textAlign: "center",
                  fontSize: 14,
                  fontColor: "#000",
                  justifyContent: "center",
                  fontWeight: "bold"
                }}
              >{`What is our app all about? Our app is a food locator that finds food near you, just simply open the app and our app will display the nearest food establishments near you! and also, we have booking, rating system, and comments for your needs.
              `}</Text>
              <Text
                style={{
                  width: "90%",
                  position: "relative",
                  textAlign: "center",
                  fontSize: 14,
                  fontColor: "#000",
                  justifyContent: "center",
                  fontWeight: "bold"
                }}
              >{`So if you have a hard time deciding where to eat, our system will help you decide where to eat.
              `}</Text>
              <Text
                style={{
                  width: "90%",
                  position: "relative",
                  textAlign: "center",
                  fontSize: 14,
                  fontColor: "#000",
                  justifyContent: "center",
                  fontWeight: "bold"
                }}
              >
                {`How awesome is that?
                `}
              </Text>
              <Text
                style={{
                  width: "90%",
                  position: "relative",
                  textAlign: "center",
                  fontSize: 14,
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: "#e6094f"
                }}
              >
                {`If you are a User read this statement:
                `}
              </Text>
              <Text
                style={{
                  width: "90%",
                  position: "relative",
                  textAlign: "center",
                  fontSize: 14,
                  fontColor: "#000",
                  justifyContent: "center",
                  fontWeight: "bold"
                }}
              >
                {`If you are in a hurry don’t worry you don’t need to register to use our system. The non-registered user can see food establishments near you but they cannot access the booking, rate, and comment function. The registered users can access all, booking, rate, and comment. They can also send a report to the admin if something is wrong with their account or with the system. Wrong credentials? Don’t worry you can also edit your personal info or account details to ensure that is your right credentials.
                `}
              </Text>
              <Text
                style={{
                  width: "90%",
                  position: "relative",
                  textAlign: "center",
                  fontSize: 14,
                  color: "#e6094f",
                  justifyContent: "center",
                  fontWeight: "bold"
                }}
              >
                {`If you are a Food Establishment owner read this statement:
                `}
              </Text>
              <Text
                style={{
                  width: "90%",
                  position: "relative",
                  textAlign: "center",
                  fontSize: 14,
                  fontColor: "#000",
                  justifyContent: "center",
                  fontWeight: "bold"
                }}
              >
                {`If you are the owner of a food establishment, just simply register in our system, fill out the registration form. Once your done with the registration, you need to add the location of your food establishment. Don’t worry! Pinning your location is not hassle, just simply go to your food establishment and click the add location. It will automatically locate where you are and pin the location where it is located. You can also edit your food establishment’s details like price range, dishes, food menu. And it can also see customers feedbacks so that you know what are the positive and negative comments of your walk in customers.`}
              </Text>
            </ScrollView>

            <Text
              style={{
                height: "9%",
                width: "11%",
                position: "absolute",
                textAlign: "center",
                textAlignVertical: "center",
                top: "98%",
                left: "3%"
              }}
            >
              <Icon
                style={{ fontSize: 30, color: "#000" }}
                name="ios-arrow-down"
                type="Ionicons"
              />
            </Text>
          </View>
        </View>
      </React.Fragment>
    );
  }
}
