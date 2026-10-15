package com.shopmind.service;

import com.shopmind.entity.*;
import com.shopmind.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DatabaseSeederService {

    @Autowired private UserRepository userRepo;
    @Autowired private BranchRepository branchRepo;
    @Autowired private CategoryRepository categoryRepo;
    @Autowired private ProductRepository productRepo;
    @Autowired private InventoryRepository inventoryRepo;
    @Autowired private CustomerRepository customerRepo;
    @Autowired private SupplierRepository supplierRepo;
    @Autowired private SaleRepository saleRepo;
    @Autowired private OnlineOrderRepository onlineOrderRepo;
    @Autowired private PurchaseOrderRepository purchaseOrderRepo;
    @Autowired private StockTransferRepository stockTransferRepo;
    @Autowired private ExpiryBatchRepository expiryBatchRepo;
    @Autowired private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void seed() {
        if (userRepo.count() > 0) return; // Skip if already seeded

        // ---- BRANCHES ----
        Branch mumbai = branchRepo.save(new Branch("Mumbai Flagship", "MUM-01", "Shop No. 12, Linking Road, Bandra West", "Mumbai", "Maharashtra", "022-26411111"));
        Branch bengaluru = branchRepo.save(new Branch("Bengaluru Tech Park", "BLR-01", "Unit 45, Prestige Tech Park, Outer Ring Road", "Bengaluru", "Karnataka", "080-67890000"));
        Branch delhi = branchRepo.save(new Branch("Delhi NCR Hub", "DEL-01", "Plot 8, Sector 18, Noida", "Noida", "Uttar Pradesh", "011-45001234"));

        // ---- CATEGORIES ----
        Category groceries   = categoryRepo.save(new Category("Groceries & Staples", "GROC", "Essential food and pantry products"));
        Category snacks      = categoryRepo.save(new Category("Snacks & Beverages", "SNBV", "Packaged snacks, drinks and confectionery"));
        Category personalCare= categoryRepo.save(new Category("Personal Care", "PCAR", "Health, hygiene and beauty products"));
        Category household   = categoryRepo.save(new Category("Household & Cleaning", "HHCL", "Cleaning agents and household supplies"));
        Category electronics = categoryRepo.save(new Category("Electronics & Accessories", "ELEC", "Consumer electronics, gadgets and peripherals"));
        Category fashion     = categoryRepo.save(new Category("Fashion & Apparel", "FASH", "Clothing, footwear and accessories"));
        Category stationery  = categoryRepo.save(new Category("Stationery & Office", "STAT", "Writing instruments and office supplies"));

        // ---- USERS ----
        userRepo.save(new User("owner",    "owner@shopmind.com",    passwordEncoder.encode("owner123"),    "Ravi Kumar (Owner)",      Role.OWNER,    mumbai.getId()));
        userRepo.save(new User("manager1", "manager@shopmind.com",  passwordEncoder.encode("manager123"),  "Priya Sharma (Manager)",  Role.MANAGER,  mumbai.getId()));
        userRepo.save(new User("cashier1", "cashier@shopmind.com",  passwordEncoder.encode("cashier123"),  "Ankit Raj (Cashier)",     Role.EMPLOYEE, mumbai.getId()));
        userRepo.save(new User("customer1","customer@shopmind.com", passwordEncoder.encode("customer123"), "Sneha Reddy (Customer)",  Role.CUSTOMER, mumbai.getId()));

        // ---- SUPPLIERS ----
        Supplier supplier1 = supplierRepo.save(new Supplier("Agro Foods Distributors Pvt Ltd", "Mahesh Nair",   "mahesh@agrofoods.in",  "9876543210", "APMC Market, Vashi, Navi Mumbai", 4.7, 3));
        Supplier supplier2 = supplierRepo.save(new Supplier("National FMCG Trading Co.",       "Rekha Iyer",   "rekha@nftc.in",        "9988776655", "60 Feet Road, Rajaji Nagar, Bengaluru", 4.5, 4));
        Supplier supplier3 = supplierRepo.save(new Supplier("TechGadgets Wholesale Hub",        "Arvind Mehta", "arvind@techgadgets.in", "9867452310", "Electronics Market, Nehru Place, Delhi", 4.3, 5));
        Supplier supplier4 = supplierRepo.save(new Supplier("Fashion First Apparel Co.",        "Sunita Gupta", "sunita@fashionfirst.in","9923456780", "Garment District, Ulhasnagar, Mumbai",  4.2, 7));

        // ---- PRODUCTS (32 authentic Indian retail products) ----
        Product p1  = productRepo.save(new Product("GRO-RIC-001","8901063111022","India Gate Basmati Rice (5kg)",         "Premium aged basmati rice from the Himalayan foothills",groceries,"India Gate",bd(320),bd(399),bd(5),25,300,"kg","https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",false));
        Product p2  = productRepo.save(new Product("GRO-ATT-002","8901058103317","Aashirvaad Shudh Chakki Atta (10kg)",   "Whole wheat flour, stone-ground for soft rotis",         groceries,"Aashirvaad",bd(400),bd(475),bd(5),20,200,"kg","https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",false));
        Product p3  = productRepo.save(new Product("GRO-SLT-003","8901058005110","Tata Salt (1kg)",                       "Iodised refined rock salt, vacuum evaporated",           groceries,"Tata",bd(18),bd(22),bd(0),50,500,"kg","https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400",false));
        Product p4  = productRepo.save(new Product("GRO-OIL-004","8901272002002","Fortune Sunlite Sunflower Oil (1L)",    "Light & healthy sunflower oil for everyday cooking",     groceries,"Fortune",bd(130),bd(155),bd(5),20,300,"L","https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",false));
        Product p5  = productRepo.save(new Product("GRO-MLK-005","8901063010018","Amul Taaza Milk (1L)",                  "Fresh toned milk, 3.0% fat, homogenised",                groceries,"Amul",bd(58),bd(66),bd(0),50,300,"L","https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",true));
        Product p6  = productRepo.save(new Product("SNB-TEA-006","8901041001018","Tata Tea Gold (500g)",                  "Strong, aromatic Assam tea with golden tips",            snacks,"Tata Tea",bd(180),bd(215),bd(5),15,200,"unit","https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400",false));
        Product p7  = productRepo.save(new Product("SNB-BSC-007","8901063011725","Britannia Good Day Biscuits (Box)",     "Crunchy cashew butter cookies, 600g party pack",         snacks,"Britannia",bd(100),bd(125),bd(12),20,300,"unit","https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",false));
        Product p8  = productRepo.save(new Product("SNB-HAL-008","8901058505213","Haldiram's Bhujia (400g)",              "Crispy Rajasthani sev mix, original recipe",             snacks,"Haldiram's",bd(90),bd(120),bd(12),15,200,"unit","https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400",false));
        Product p9  = productRepo.save(new Product("SNB-MAG-009","8901258000306","Maggi 2-Minute Noodles (Pack of 4)",    "Iconic masala noodles, pack of 4 x 70g",                 snacks,"Maggi",bd(50),bd(68),bd(12),30,400,"unit","https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400",false));
        Product p10 = productRepo.save(new Product("SNB-CDM-010","7622210107541","Cadbury Dairy Milk Silk (160g)",        "Premium silky smooth milk chocolate bar",                snacks,"Cadbury",bd(150),bd(185),bd(18),10,150,"unit","https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=400",false));
        Product p11 = productRepo.save(new Product("PCR-SHP-011","8901030754133","Dove Daily Shine Shampoo (340ml)",      "Nourishing shampoo for soft, lustrous hair",             personalCare,"Dove",bd(190),bd(249),bd(18),10,100,"unit","https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400",false));
        Product p12 = productRepo.save(new Product("PCR-DET-012","8710908527203","Dettol Original Handwash (900ml)",      "Antibacterial liquid soap with pine fragrance",          personalCare,"Dettol",bd(130),bd(175),bd(18),10,100,"unit","https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",false));
        Product p13 = productRepo.save(new Product("PCR-CLP-013","8901071026942","Colgate MaxFresh Toothpaste (150g)",    "Cooling crystals for long-lasting fresh breath",         personalCare,"Colgate",bd(65),bd(88),bd(18),20,200,"unit","https://images.unsplash.com/photo-1556226896-4e71e197feae?w=400",false));
        Product p14 = productRepo.save(new Product("PCR-NIV-014","4005808251926","Nivea Soft Moisturizing Cream (100ml)", "Light moisturizer with Jojoba oil & Vitamin E",          personalCare,"Nivea",bd(105),bd(145),bd(18),10,150,"unit","https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400",false));
        Product p15 = productRepo.save(new Product("HHC-SRF-015","8901030722675","Surf Excel Matic Liquid Detergent (2L)","Powerful stain remover for top-load washing machines",   household,"Surf Excel",bd(270),bd(340),bd(18),10,100,"L","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",false));
        Product p16 = productRepo.save(new Product("HHC-VIM-016","8901030714908","Vim Dishwash Liquid Gel (750ml)",       "Tough grease removal with natural lime extract",         household,"Vim",bd(80),bd(105),bd(18),15,150,"unit","https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400",false));
        Product p17 = productRepo.save(new Product("HHC-HRP-017","8901030784788","Harpic Disinfectant Toilet Cleaner (1L)","Kills 99.9% of germs with powerful lime formula",       household,"Harpic",bd(75),bd(98),bd(18),10,120,"L","https://images.unsplash.com/photo-1564419320461-6870880221ad?w=400",false));
        Product p18 = productRepo.save(new Product("ELE-BOT-018","8904130505553","boAt Rockerz 450 Bluetooth Headphones", "50-hr playtime, 40mm drivers, dual pairing",             electronics,"boAt",bd(1200),bd(1799),bd(18),5,50,"unit","https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",false));
        Product p19 = productRepo.save(new Product("ELE-NIS-019","8906136850049","Noise ColorFit Pulse Smartwatch",       "AMOLED, 100+ sport modes, SpO2 & HR monitor",           electronics,"Noise",bd(2200),bd(3499),bd(18),5,30,"unit","https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",false));
        Product p20 = productRepo.save(new Product("ELE-SND-020","619659161708", "SanDisk 64GB Ultra Flash Drive",        "USB 3.0, up to 130 MB/s read speed",                    electronics,"SanDisk",bd(380),bd(549),bd(18),5,80,"unit","https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400",false));
        Product p21 = productRepo.save(new Product("ELE-PRT-021","8904114902221","Portronics 20W Fast Charger",           "Dual USB-A & USB-C PD charging, foldable pin",           electronics,"Portronics",bd(400),bd(599),bd(18),5,60,"unit","https://images.unsplash.com/photo-1609592859236-a9ac0f76059a?w=400",false));
        Product p22 = productRepo.save(new Product("FAS-TSH-022","8TSHMCPNY001", "Men's Classic Polo T-Shirt (Navy)",     "Premium pique cotton polo, regular fit",                 fashion,"ShopMind Basics",bd(280),bd(449),bd(12),5,100,"unit","https://images.unsplash.com/photo-1581791538161-8a1ffe84e5f1?w=400",false));
        Product p23 = productRepo.save(new Product("FAS-SHO-023","8902466043208","Sparx Running Shoes (Size 9)",          "Lightweight mesh upper with bounce-back foam sole",      fashion,"Sparx",bd(650),bd(999),bd(12),3,50,"unit","https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",false));
        Product p24 = productRepo.save(new Product("STA-NBK-024","8901764000115","Classmate Spiral Notebook (300 pgs)",   "Hard cover A4 ruled, 300 pages, long-life binding",      stationery,"Classmate",bd(80),bd(110),bd(0),10,200,"unit","https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?w=400",false));
        Product p25 = productRepo.save(new Product("STA-PEN-025","8901055003141","Reynolds Trimax Gel Pen (Pack of 5)",   "Smooth 0.5mm gel ink, blue, long-lasting cartridge",     stationery,"Reynolds",bd(60),bd(85),bd(0),20,300,"unit","https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=400",false));
        Product p26 = productRepo.save(new Product("GRO-DAL-026","8901063111030","Toor Dal (Yellow Lentils 1kg)",         "Premium farm-fresh yellow pigeon peas",                  groceries,"Nature Fresh",bd(95),bd(120),bd(5),15,200,"kg","https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",false));
        Product p27 = productRepo.save(new Product("GRO-SBJ-027","8906022500110","Saffola Active Pro Weight-Watcher Oil", "Blended edible oil with Losorb technology",              groceries,"Saffola",bd(150),bd(185),bd(5),10,200,"L","https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",false));
        Product p28 = productRepo.save(new Product("SNB-PRG-028","8901063031556","Parle-G Original Gold Biscuits (800g)", "Classic glucose biscuit, India's favourite",             snacks,"Parle",bd(35),bd(50),bd(12),30,500,"unit","https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",false));
        Product p29 = productRepo.save(new Product("PCR-PCH-029","8901030740755","Head & Shoulders Anti-Dandruff Shampoo","Classic clean formula, 340ml",                           personalCare,"H&S",bd(195),bd(259),bd(18),8,100,"unit","https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400",false));
        Product p30 = productRepo.save(new Product("ELE-CAB-030","8904114900001","Portronics Type-C Charging Cable (1.5m)","Nylon-braided fast charge & data cable",                electronics,"Portronics",bd(150),bd(249),bd(18),8,100,"unit","https://images.unsplash.com/photo-1609592859236-a9ac0f76059a?w=400",false));
        Product p31 = productRepo.save(new Product("HHC-LZY-031","8901030816886","Lizol Disinfectant Surface Cleaner (2L)","Multi-surface cleaner, kills 99.9% bacteria",           household,"Lizol",bd(130),bd(175),bd(18),8,100,"L","https://images.unsplash.com/photo-1564419320461-6870880221ad?w=400",false));
        Product p32 = productRepo.save(new Product("FAS-BLT-032","8905BLT00001", "Woodland Brown Leather Belt (Size 34)", "Genuine leather, reversible pin buckle",                 fashion,"Woodland",bd(450),bd(749),bd(12),3,30,"unit","https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",false));

        List<Product> products = List.of(p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,p21,p22,p23,p24,p25,p26,p27,p28,p29,p30,p31,p32);
        List<Branch> branches = List.of(mumbai, bengaluru, delhi);

        // ---- INVENTORY (all products across 3 branches with varied stock) ----
        int[][] stock = {
            {180,140,90},{95,60,42},{320,280,250},{95,110,88},{90,60,70},{80,50,65},
            {120,85,100},{74,60,55},{130,120,100},{45,30,28},{38,25,30},{42,30,25},
            {70,60,80},{55,40,35},{38,28,22},{60,45,50},{45,30,35},{18,12,8},
            {12,8,5},{80,40,35},{55,38,45},{62,20,30},{15,8,6},{145,80,60},
            {120,90,75},{80,65,55},{70,55,48},{210,180,160},{32,24,18},{65,50,40},
            {45,30,35},{10,6,4}
        };

        for (int i = 0; i < products.size(); i++) {
            for (int j = 0; j < 3; j++) {
                int qty = stock[i][j];
                int reorderLvl = products.get(i).getMinStockLevel();
                int safety = Math.max(5, reorderLvl / 2);
                inventoryRepo.save(new Inventory(products.get(i), branches.get(j), qty, 0, reorderLvl, safety));
            }
        }

        // ---- CUSTOMERS ----
        Customer c1 = customerRepo.save(new Customer("Sneha Reddy",      "sneha.reddy@email.com",   "9876543210", 1820, "HIGH_VALUE", bd(42100), 32, LocalDateTime.now().minusDays(3)));
        Customer c2 = customerRepo.save(new Customer("Rohit Sharma",     "rohit.s@email.com",       "9988112233", 540,  "REGULAR",    bd(8200),  12, LocalDateTime.now().minusDays(8)));
        Customer c3 = customerRepo.save(new Customer("Meera Nair",       "meera.nair@email.com",    "9765432100", 210,  "REGULAR",    bd(5600),   8, LocalDateTime.now().minusDays(14)));
        Customer c4 = customerRepo.save(new Customer("Suresh Iyer",      "suresh.i@email.com",      "9871230045", 0,    "AT_RISK",    bd(12400),  7, LocalDateTime.now().minusDays(58)));
        Customer c5 = customerRepo.save(new Customer("Divya Menon",      "divya.m@email.com",       "9845670123", 890,  "HIGH_VALUE", bd(38000),  28, LocalDateTime.now().minusDays(2)));
        Customer c6 = customerRepo.save(new Customer("Arjun Kapoor",     "arjun.k@email.com",       "9912340567", 120,  "NEW",        bd(1850),   2, LocalDateTime.now().minusDays(5)));
        Customer c7 = customerRepo.save(new Customer("Pooja Tiwari",     "pooja.t@email.com",       "9823456789", 380,  "REGULAR",    bd(7200),   9, LocalDateTime.now().minusDays(12)));
        Customer c8 = customerRepo.save(new Customer("Rahul Verma",      "rahul.v@email.com",       "9834561230", 0,    "INACTIVE",   bd(4100),   4, LocalDateTime.now().minusDays(140)));

        // ---- SALES (recent POS transactions) ----
        seedSales(mumbai, bengaluru, delhi, p1, p2, p4, p5, p6, p7, p9, p11, p12, p18, c1, c2, c5);

        // ---- ONLINE ORDERS ----
        OnlineOrder o1 = new OnlineOrder("ORD-2026-00041", c1, mumbai, "Flat 4B, Sagar Heights, Andheri West, Mumbai - 400058", "PAID", "DELIVERED", bd(3582));
        o1.getItems().add(new OnlineOrderItem(o1, p18, 1, bd(1799), bd(1799)));
        o1.getItems().add(new OnlineOrderItem(o1, p21, 2, bd(599),  bd(1198)));
        o1.setCreatedAt(LocalDateTime.now().minusDays(3));
        onlineOrderRepo.save(o1);

        OnlineOrder o2 = new OnlineOrder("ORD-2026-00042", c5, bengaluru, "Villa 7, Prestige Willow Creek, Bengaluru - 560076", "PAID", "SHIPPED", bd(3499));
        o2.getItems().add(new OnlineOrderItem(o2, p19, 1, bd(3499), bd(3499)));
        o2.setCreatedAt(LocalDateTime.now().minusDays(1));
        onlineOrderRepo.save(o2);

        OnlineOrder o3 = new OnlineOrder("ORD-2026-00043", c6, mumbai, "A-204, New Swastik CHS, Kandivali East, Mumbai - 400101", "PAID", "CONFIRMED", bd(1404));
        o3.getItems().add(new OnlineOrderItem(o3, p11, 2, bd(249),  bd(498)));
        o3.getItems().add(new OnlineOrderItem(o3, p14, 3, bd(145),  bd(435)));
        o3.getItems().add(new OnlineOrderItem(o3, p16, 3, bd(105),  bd(315)));
        o3.getItems().add(new OnlineOrderItem(o3, p13, 2, bd(88),   bd(176)));
        o3.setCreatedAt(LocalDateTime.now().minusHours(6));
        onlineOrderRepo.save(o3);

        // ---- PURCHASE ORDERS ----
        PurchaseOrder po1 = new PurchaseOrder("PO-2026-089", supplier1, mumbai, "APPROVED", LocalDate.now().minusDays(2), LocalDate.now().plusDays(2), bd(14800), "Regular weekly grocery replenishment");
        po1.getItems().add(new PurchaseOrderItem(po1, p1, 50, bd(320), bd(16000)));
        po1.getItems().add(new PurchaseOrderItem(po1, p4, 80, bd(130), bd(10400)));
        purchaseOrderRepo.save(po1);

        PurchaseOrder po2 = new PurchaseOrder("PO-2026-090", supplier3, bengaluru, "SUBMITTED", LocalDate.now(), LocalDate.now().plusDays(5), bd(12000), "Electronics restocking pre-Diwali sale");
        po2.getItems().add(new PurchaseOrderItem(po2, p18, 10, bd(1200), bd(12000)));
        purchaseOrderRepo.save(po2);

        // ---- STOCK TRANSFERS ----
        StockTransfer st1 = new StockTransfer("TRF-2026-011", delhi, mumbai, "SUGGESTED",
            "Maggi Noodles expiry risk at Delhi NCR Hub — Mumbai Flagship has high daily velocity. AI recommended transfer.");
        st1.getItems().add(new StockTransferItem(st1, p9, 50));
        stockTransferRepo.save(st1);

        StockTransfer st2 = new StockTransfer("TRF-2026-012", bengaluru, delhi, "REQUESTED",
            "Classmate Notebooks idle 48 days at Bengaluru Tech Park — Delhi NCR Hub opening school season demand.");
        st2.getItems().add(new StockTransferItem(st2, p24, 80));
        stockTransferRepo.save(st2);

        // ---- EXPIRY BATCHES ----
        expiryBatchRepo.save(new ExpiryBatch(p5,  mumbai,    "B-AMUL-2026-09A", 38, LocalDate.now().minusDays(20), LocalDate.now().plusDays(5),  "ACTIVE"));
        expiryBatchRepo.save(new ExpiryBatch(p8,  bengaluru, "B-HLD-2026-08B",  74, LocalDate.now().minusDays(45), LocalDate.now().plusDays(16), "ACTIVE"));
        expiryBatchRepo.save(new ExpiryBatch(p9,  delhi,     "B-MAG-2026-07K",  120,LocalDate.now().minusDays(60), LocalDate.now().plusDays(10), "ACTIVE"));
        expiryBatchRepo.save(new ExpiryBatch(p2,  mumbai,    "B-ASH-2026-06M",  42, LocalDate.now().minusDays(10), LocalDate.now().plusDays(45), "ACTIVE"));
    }

    private void seedSales(Branch mumbai, Branch bengaluru, Branch delhi,
        Product rice, Product atta, Product oil, Product milk, Product tea, Product biscuit,
        Product maggi, Product shampoo, Product handwash, Product headphones,
        Customer c1, Customer c2, Customer c5) {

        int saleCounter = 1001;
        LocalDateTime[] timestamps = {
            LocalDateTime.now().minusHours(1), LocalDateTime.now().minusHours(3),
            LocalDateTime.now().minusHours(5), LocalDateTime.now().minusDays(1),
            LocalDateTime.now().minusDays(2),  LocalDateTime.now().minusDays(3)
        };

        // Sale 1 — Mumbai, morning POS
        Sale s1 = new Sale("INV-" + saleCounter++, mumbai, "cashier1", c1, "UPI", bd(738), bd(0), bd(37), bd(775));
        s1.setTimestamp(timestamps[0]);
        SaleItem si1a = new SaleItem(s1, rice,    2, bd(399), bd(798), bd(40),  bd(838));
        SaleItem si1b = new SaleItem(s1, oil,     1, bd(155), bd(155), bd(7.75),bd(163));
        s1.getItems().addAll(List.of(si1a, si1b));
        saleRepo.save(s1);

        // Sale 2 — Mumbai, afternoon
        Sale s2 = new Sale("INV-" + saleCounter++, mumbai, "cashier1", c2, "CARD", bd(498), bd(50), bd(25), bd(473));
        s2.setTimestamp(timestamps[1]);
        SaleItem si2a = new SaleItem(s2, shampoo, 2, bd(249), bd(498), bd(90),  bd(588));
        s2.getItems().add(si2a);
        saleRepo.save(s2);

        // Sale 3 — Bengaluru
        Sale s3 = new Sale("INV-" + saleCounter++, bengaluru, "manager1", c5, "CASH", bd(1799), bd(0), bd(324), bd(2123));
        s3.setTimestamp(timestamps[2]);
        SaleItem si3a = new SaleItem(s3, headphones, 1, bd(1799), bd(1799), bd(323.82), bd(2122.82));
        s3.getItems().add(si3a);
        saleRepo.save(s3);

        // Sale 4 — Delhi previous day
        Sale s4 = new Sale("INV-" + saleCounter++, delhi, "cashier1", null, "UPI", bd(204), bd(0), bd(10), bd(214));
        s4.setTimestamp(timestamps[3]);
        SaleItem si4a = new SaleItem(s4, tea,     1, bd(215), bd(215), bd(10.75), bd(225.75));
        s4.getItems().add(si4a);
        saleRepo.save(s4);

        // Sale 5 — Mumbai 2 days ago
        Sale s5 = new Sale("INV-" + saleCounter++, mumbai, "cashier1", c1, "CASH", bd(561), bd(0), bd(67), bd(628));
        s5.setTimestamp(timestamps[4]);
        SaleItem si5a = new SaleItem(s5, biscuit, 3, bd(125), bd(375), bd(45),  bd(420));
        SaleItem si5b = new SaleItem(s5, milk,    3, bd(66),  bd(198), bd(0),   bd(198));
        s5.getItems().addAll(List.of(si5a, si5b));
        saleRepo.save(s5);

        // Sale 6 — Mumbai 3 days ago
        Sale s6 = new Sale("INV-" + saleCounter++, mumbai, "cashier1", c2, "CARD", bd(475), bd(0), bd(24), bd(499));
        s6.setTimestamp(timestamps[5]);
        SaleItem si6a = new SaleItem(s6, atta, 1, bd(475), bd(475), bd(23.75), bd(498.75));
        s6.getItems().add(si6a);
        saleRepo.save(s6);
    }

    private BigDecimal bd(double val) {
        return BigDecimal.valueOf(val);
    }
}
