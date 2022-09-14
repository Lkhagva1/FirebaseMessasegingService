package com.globalvision.goodsoil;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import android.os.Bundle;

public class Splash extends AppCompatActivity {
    private WebView webView;
    private String path = "";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        webView = (WebView) findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setUserAgentString(USER_SERVICE);
       // webView.setWebChromeClient(new WebChromeClient());
        //webView.setWebViewClient(new WebViewClient());
        webView.getSettings().setDomStorageEnabled(true);

        webView.loadUrl("https://www.goodsoil.mn/app/");

        // force links open in webview only
        // link-iig shalgakh MyNewWebViewClient
        webView.setWebViewClient(new MyNewWebViewClient());

        this.getSupportActionBar().hide();
    }
    private class MyNewWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            if ("www.goodsoil.mn".equals(Uri.parse(url).getHost())) {
                    // This is my website, so do not override; let my WebView load the page
                // "www.goodsoil.mn" aguulsan URL-iig neene
                return false;
            }
            else {
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                startActivity(intent);
            }

                //   Toast.makeText(getApplicationContext(), "FIFTH="+url, Toast.LENGTH_LONG).show();
          //      Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));


            return true;
        }
    }
}
