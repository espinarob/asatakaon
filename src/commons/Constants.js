const Constants = {
	APP_PAGES               : {
		WELCOME_APP_PAGE    : 'WELCOME_APP_PAGE',
		LOADING_SCREEN_APP  : 'LOADING_SCREEN_APP',
		SPLASH_SCREEN_APP   : 'SPLASH_SCREEN_APP',
		FIND_RESTAURANT_APP : 'FIND_RESTAURANT_APP',
		LOGIN_APP_PAGE      : 'LOGIN_APP_PAGE',
		SIGN_APP_PAGE       : 'SIGN_APP_PAGE',
		SIGN_RESTAURANT     : 'SIGN_RESTAURANT'
	},

	LOADING_TEXT            : {
		LOGGING_IN          : 'Logging you in, getting everything ready..',
		GETTING_CONNECTED   : 'Connecting to the server, please wait..',
		USER_OFFLINE        : 'Check your connectivity, you are offline.',
		USER_CONNECTED      : 'You are now connected'
	},

	TIME                    : {
		SPLASH_SCREEN_TIME  : 1000
	},
	CREDENTIALS_POLICY      : {
		MIN_USERNAME        : 10,
		MAX_USERNAME        : 25,
		MIN_PASSWORD        : 8,
		MAX_PASSWORD        : 20
	},
	REPORT_DISPLAY_TIME     : 3000,
	FIRE_BASE_CONFIG : {
		apiKey: "AIzaSyCmZpd23BMyDDTnNhcHoXPUnD6eLgxZ6J8",
	    authDomain: "asatakaonproj.firebaseapp.com",
	    databaseURL: "https://asatakaonproj.firebaseio.com",
	    projectId: "asatakaonproj",
	    storageBucket: "asatakaonproj.appspot.com",
	    messagingSenderId: "1094462141971"
	}
}; 
export default Constants;

