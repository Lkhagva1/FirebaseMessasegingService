package com.globalvision.goodsoil;

import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.os.Handler;


public class MainActivity extends AppCompatActivity {

    private static int SPLASH_TIME_OUT = 2500;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (haveNetwork()) {
            setContentView(R.layout.activity_main);
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    Intent homeIntent = new Intent(MainActivity.this, Splash.class);
                    startActivity(homeIntent);
                    finish();
                }
            }, SPLASH_TIME_OUT);

            Toolbar toolbar = findViewById(R.id.toolbar);
            setSupportActionBar(toolbar);

            this.getSupportActionBar().hide();
        } else if (!haveNetwork()){
          //  Toast.makeText(MainActivity.this, "Интернет холболтоо шалгана уу!",Toast.LENGTH_SHORT).show();
            openDialog();
        }
    }

    private boolean haveNetwork(){
        boolean have_WIFI = false;
        boolean have_MobileData = false;

        ConnectivityManager connectivityManager=(ConnectivityManager) getSystemService(CONNECTIVITY_SERVICE);
        NetworkInfo[] networkInfos =connectivityManager.getAllNetworkInfo();

        for(NetworkInfo info:networkInfos){
            if(info.getTypeName().equalsIgnoreCase("WIFI"))
                if (info.isConnected())
                have_WIFI=true;
            if (info.getTypeName().equalsIgnoreCase("MOBILE"))
                if (info.isConnected())
                have_MobileData=true;
        }

        return have_MobileData||have_WIFI;

    }

    public void openDialog(){
        MyAppDialog myAppDialog = new MyAppDialog();
        myAppDialog.show(getSupportFragmentManager(), "My Dialog");
    }


}
