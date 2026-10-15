package com.shopmind.repository;

import com.shopmind.entity.OnlineOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OnlineOrderRepository extends JpaRepository<OnlineOrder, Long> {
    List<OnlineOrder> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
    List<OnlineOrder> findByOrderStatusOrderByCreatedAtDesc(String status);
}
