package com.quiz_app.service.ipservice;

import com.quiz_app.entity.validip.InvalidIP;
import com.quiz_app.repository.InvalidIPRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.net.Inet4Address;
import java.net.Inet6Address;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IPService {
    private final InvalidIPRepository invalidIPRepository;
    private final CacheManager cacheManager;

    @PostConstruct
    public void init() {
        Cache bannedIPsCache = cacheManager.getCache("bannedIPs");
        if (bannedIPsCache != null) {
            List<InvalidIP> allInvalidIPs = invalidIPRepository.findAll();
            for (InvalidIP invalidIP : allInvalidIPs) {
                bannedIPsCache.put(invalidIP.getBannedIp(), true);
            }
        }
    }

    @Cacheable(value = "bannedIPs", key = "#ipAddress")
    public boolean isBanned(String ipAddress) {
        return invalidIPRepository.findByBannedIp(ipAddress).isPresent();
    }

    @CachePut(value = "bannedIPs", key = "#bannedIPAddress")
    public void saveBannedIP(String bannedIPAddress) {
        if (!isIPv4(bannedIPAddress) && !isIPv6(bannedIPAddress)) {
            throw new RuntimeException("Please provide a valid ip address");
        }
        var bannedIP = InvalidIP.builder()
                .bannedIp(bannedIPAddress).build();
        invalidIPRepository.save(bannedIP);
    }

    @CacheEvict(value = "bannedIPs", key = "#bannedIPAddress")
    public void removeBannedIP(String bannedIPAddress) {
        if (!isIPv4(bannedIPAddress) && !isIPv6(bannedIPAddress)) {
            throw new RuntimeException("Please provide a valid ip address");
        }
        var bannedIP = invalidIPRepository.findByBannedIp(bannedIPAddress);
        if (bannedIP.isEmpty()) {
            throw new RuntimeException("This IP does not exists in the database");
        }
        invalidIPRepository.delete(bannedIP.get());
    }

    private static boolean isIPv4(String input) {
        try {
            InetAddress inetAddress = InetAddress.getByName(input);
            return (inetAddress instanceof Inet4Address) && inetAddress.getHostAddress().equals(input);
        } catch (UnknownHostException ex) {
            return false;
        }
    }

    private static boolean isIPv6(String input) {
        try {
            InetAddress inetAddress = InetAddress.getByName(input);
            return (inetAddress instanceof Inet6Address);
        } catch (UnknownHostException ex) {
            return false;
        }
    }
}

