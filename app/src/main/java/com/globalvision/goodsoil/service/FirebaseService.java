package com.globalvision.goodsoil.service;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Vibrator;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.globalvision.goodsoil.MainActivity;
import com.globalvision.goodsoil.R;
import com.globalvision.goodsoil.config.Config;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import org.json.JSONException;
import org.json.JSONObject;

public class FirebaseService extends FirebaseMessagingService {
    private static final String TAG = "FirebaseMessaging";

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        String title = "0";
        String body = "0";
        String click_action = "0";
        String id = "0";
//        data өгөгдөл агуулсан эсэхийг шалгах
        if (remoteMessage.getData().size() > 0) {
            Log.d(TAG, "Message data payload:" + remoteMessage.getData());
            try {
                JSONObject data = new JSONObject(remoteMessage.getData());
                id = data.getString("id");
                Log.d(TAG, "OnMessageRecieved: \n" + "EXtra information:" + id);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
//            Мессежд мэдэгдлийн ачаалал байгаа эсэхийг шалгах
        if (remoteMessage.getNotification() != null) {
            title = remoteMessage.getNotification().getTitle();
            body = remoteMessage.getNotification().getBody();
            click_action = remoteMessage.getNotification().getClickAction();

            Log.d(TAG, "message notification title:" + title);
            Log.d(TAG, "message notification body:" + body);
            Log.d(TAG, "message notification click_action:" + click_action);
        }
        //Мөн та хүлээн авсан FCM-ийн үр дүнд өөрийн мэдэгдэл үүсгэхээр төлөвлөж байгаа бол
//      мессеж, эндээс эхлэх. sendNotification доороос үзнэ үү.
        sendNotification(id, title, body, click_action);
        HandleMessage(remoteMessage.getData().get(Config.STR_KEY));
    }

    private void HandleMessage(String message) {
        Intent pushnotification=new Intent(Config.STR_PUSH);
        pushnotification.putExtra(Config.STR_MESSAGE,message);
        LocalBroadcastManager.getInstance(this).sendBroadcast(pushnotification);
    }

    private void sendNotification(String id, String title, String body, String click_action) {

        Uri notification = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        Ringtone r = RingtoneManager.getRingtone(getApplicationContext(), notification);
        r.play();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            r.setLooping(false);
        }
        Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
        long[] vibrate = new long[]{1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000};
        Intent intent = new Intent(this, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pendingIntent=PendingIntent.getActivity(this,0,intent,PendingIntent.FLAG_ONE_SHOT);

        Uri defaultSoundUri= RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
        NotificationCompat.Builder notificationBuilder=new NotificationCompat.Builder(this)
                .setSmallIcon(R.drawable.splash)
                .setContentTitle(title)
                .setContentText(body)
                .setAutoCancel(true)
                .setVibrate(vibrate)

                .setPriority(Notification.PRIORITY_MAX)
                .setSound(defaultSoundUri)
                .setContentIntent(pendingIntent);

        NotificationManager notificationManager=(NotificationManager)getSystemService(Context.NOTIFICATION_SERVICE);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
        {
            String channelId = "Your_channel_id";
            NotificationChannel channel = new NotificationChannel(
                    channelId,
                    "Channel human readable title",
                    NotificationManager.IMPORTANCE_HIGH);
            notificationManager.createNotificationChannel(channel);
            notificationBuilder.setChannelId(channelId);
        }
        notificationManager.notify(1,notificationBuilder.build());
    }
    }
