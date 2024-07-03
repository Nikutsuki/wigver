package org.wigverification.wigverification;
import com.sun.net.httpserver.HttpServer;
import org.bukkit.Bukkit;
import org.bukkit.event.Listener;
import org.bukkit.plugin.java.JavaPlugin;
import java.io.IOException;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public final class WIG_Verification extends JavaPlugin implements Listener {
    @Override
    public void onEnable() {
        Bukkit.getPluginManager().registerEvents(this, this);
        try {
            HttpServer server = HttpServer.create(new InetSocketAddress(6969), 0);
            server.createContext("/add_whitelist", new WhitelistHandler());
            server.setExecutor(null);
            server.start();
        } catch (IOException e) {
            Bukkit.getLogger().info(e.getMessage());
        }
    }
    @Override
    public void onDisable() {

    }

    static class WhitelistHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) {
            try {
                String nickname = t.getRequestURI().getQuery().split("=")[1];
                Bukkit.getServer().dispatchCommand(Bukkit.getConsoleSender(), "wl add" + nickname);
            } catch (Exception e) {
                Bukkit.getLogger().info(e.getMessage());
            }
        }
    }
}