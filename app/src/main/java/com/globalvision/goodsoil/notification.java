package com.globalvision.goodsoil;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.view.MenuItem;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.globalvision.goodsoil.config.Config;
import com.google.firebase.messaging.FirebaseMessaging;

public class notification extends AppCompatActivity {
    private WebView webView;
    private ProgressDialog dialog;
    private BroadcastReceiver mRegistrationBroadcastReceiver;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notification);
        FirebaseMessaging.getInstance().subscribeToTopic("All");
        ActionBar actionBar = getSupportActionBar();
        webView=(WebView) findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient(){
            @Override
            public void onPageFinished(WebView view, String url) {
                if (dialog.isShowing())
                    dialog.dismiss();
            }
        });
        mRegistrationBroadcastReceiver=new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                if (getIntent().getAction().equals(Config.STR_PUSH)){
                    String message=intent.getStringExtra(Config.STR_MESSAGE);
                    showNotification("title dev",message);
                }
            }

            private void showNotification(String title, String message) {
                Intent intent=new Intent(getBaseContext(),notification.class);
                intent.putExtra(Config.STR_KEY,message);
                intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                PendingIntent contentIntent=PendingIntent.getActivity(getBaseContext(),0,intent,PendingIntent.FLAG_UPDATE_CURRENT);
                NotificationCompat.Builder builder=new NotificationCompat.Builder(getBaseContext());
                builder.setAutoCancel(true)
                        .setWhen(System.currentTimeMillis())
                        .setDefaults(Notification.DEFAULT_ALL)
                        .setSmallIcon(R.mipmap.ic_launcher_round)
                        .setContentTitle(title)
                        .setContentText(message)
                        .setContentIntent(contentIntent);
                NotificationManager notificationManager=(NotificationManager) getBaseContext().getSystemService(Context.NOTIFICATION_SERVICE);
                notificationManager.notify(1,builder.build());
            }
        };        onNewIntent(getIntent());
        actionBar.setDisplayHomeAsUpEnabled(true);
    }
    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                this.finish();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        dialog = new ProgressDialog(this);
        if (intent.getStringExtra(Config.STR_KEY) != null) {
            dialog.show();
            dialog.setMessage("Please waiting...");
            webView.loadUrl(intent.getStringExtra(Config.STR_KEY));
        }
    }
    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
//            Toast.makeText(this,"back",Toast.LENGTH_SHORT).show();
        }
        else {
            super.onBackPressed();
        }
    }
    @Override
    protected void onPause() {
        LocalBroadcastManager.getInstance(this).unregisterReceiver(mRegistrationBroadcastReceiver);
        super.onPause();
    }

    @Override
    protected void onResume() {
        LocalBroadcastManager.getInstance(this).registerReceiver(mRegistrationBroadcastReceiver,new IntentFilter("registrationComplete"));
        LocalBroadcastManager.getInstance(this).registerReceiver(mRegistrationBroadcastReceiver,new IntentFilter(Config.STR_PUSH));
        super.onResume();
    }
}