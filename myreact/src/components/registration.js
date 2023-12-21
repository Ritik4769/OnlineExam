import React, { useEffect, useState } from 'react';
import img1 from '../Images/registration-form-image.jpg';
import img2 from '../Images/user_icon.jpg';
import img3 from '../Images/phone_icon.jpg';
import img4 from '../Images/adhaar_icon.jpg';
import img5 from '../Images/dob_icon.jpg';
import img6 from '../Images/email_icon.jpg';
import img7 from '../Images/password_icon.jpg';
import img8 from '../Images/document_icon.jpg';
import { loadStripe } from '@stripe/stripe-js';
import {Loader,toggleLoader} from './Loader.js';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookie from "js-cookie";

import axios from 'axios';
import Modal from 'react-modal';
const modalCss = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '8px',
        width: '500px'
    }
}

var username = false, checkemail = false, Adhaar = false, City = false, phone = false, pass = false, Address = false, State = false;
export default function Registration() {
    var state_arr = new Array("Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal");

    var s_a = new Array();
    s_a[0] = "";
    s_a[1] = " Alipur | Andaman Island | Anderson Island | Arainj-Laka-Punga | Austinabad | Bamboo Flat | Barren Island | Beadonabad | Betapur | Bindraban | Bonington | Brookesabad | Cadell Point | Calicut | Chetamale | Cinque Islands | Defence Island | Digilpur | Dolyganj | Flat Island | Geinyale | Great Coco Island | Haddo | Havelock Island | Henry Lawrence Island | Herbertabad | Hobdaypur | Ilichar | Ingoie | Inteview Island | Jangli Ghat | Jhon Lawrence Island | Karen | Kartara | KYD Islannd | Landfall Island | Little Andmand | Little Coco Island | Long Island | Maimyo | Malappuram | Manglutan | Manpur | Mitha Khari | Neill Island | Nicobar Island | North Brother Island | North Passage Island | North Sentinel Island | Nothen Reef Island | Outram Island | Pahlagaon | Palalankwe | Passage Island | Phaiapong | Phoenix Island | Port Blair | Preparis Island | Protheroepur | Rangachang | Rongat | Rutland Island | Sabari | Saddle Peak | Shadipur | Smith Island | Sound Island | South Sentinel Island | Spike Island | Tarmugli Island | Taylerabad | Titaije | Toibalawe | Tusonabad | West Island | Wimberleyganj | Yadita";
    s_a[2] = " Achampet | Adilabad | Adoni | Alampur | Allagadda | Alur | Amalapuram | Amangallu | Anakapalle | Anantapur | Andole | Araku | Armoor | Asifabad | Aswaraopet | Atmakur | B. Kothakota | Badvel | Banaganapalle | Bandar | Bangarupalem | Banswada | Bapatla | Bellampalli | Bhadrachalam | Bhainsa | Bheemunipatnam | Bhimadole | Bhimavaram | Bhongir | Bhooragamphad | Boath | Bobbili | Bodhan | Chandoor | Chavitidibbalu | Chejerla | Chepurupalli | Cherial | Chevella | Chinnor | Chintalapudi | Chintapalle | Chirala | Chittoor | Chodavaram | Cuddapah | Cumbum | Darsi | Devarakonda | Dharmavaram | Dichpalli | Divi | Donakonda | Dronachalam | East Godavari | Eluru | Eturnagaram | Gadwal | Gajapathinagaram | Gajwel | Garladinne | Giddalur | Godavari | Gooty | Gudivada | Gudur | Guntur | Hindupur | Hunsabad | Huzurabad | Huzurnagar | Hyderabad | Ibrahimpatnam | Jaggayyapet | Jagtial | Jammalamadugu | Jangaon | Jangareddygudem | Jannaram | Kadiri | Kaikaluru | Kakinada | Kalwakurthy | Kalyandurg | Kamalapuram | Kamareddy | Kambadur | Kanaganapalle | Kandukuru | Kanigiri | Karimnagar | Kavali | Khammam | Khanapur (AP) | Kodangal | Koduru | Koilkuntla | Kollapur | Kothagudem | Kovvur | Krishna | Krosuru | Kuppam | Kurnool | Lakkireddipalli | Madakasira | Madanapalli | Madhira | Madnur | Mahabubabad | Mahabubnagar | Mahadevapur | Makthal | Mancherial | Mandapeta | Mangalagiri | Manthani | Markapur | Marturu | Medachal | Medak | Medarmetla | Metpalli | Mriyalguda | Mulug | Mylavaram | Nagarkurnool | Nalgonda | Nallacheruvu | Nampalle | Nandigama | Nandikotkur | Nandyal | Narasampet | Narasaraopet | Narayanakhed | Narayanpet | Narsapur | Narsipatnam | Nazvidu | Nelloe | Nellore | Nidamanur | Nirmal | Nizamabad | Nuguru | Ongole | Outsarangapalle | Paderu | Pakala | Palakonda | Paland | Palmaneru | Pamuru | Pargi | Parkal | Parvathipuram | Pathapatnam | Pattikonda | Peapalle | Peddapalli | Peddapuram | Penukonda | Piduguralla | Piler | Pithapuram | Podili | Polavaram | Prakasam | Proddatur | Pulivendla | Punganur | Putturu | Rajahmundri | Rajampeta | Ramachandrapuram | Ramannapet | Rampachodavaram | Rangareddy | Rapur | Rayachoti | Rayadurg | Razole | Repalle | Saluru | Sangareddy | Sathupalli | Sattenapalle | Satyavedu | Shadnagar | Siddavattam | Siddipet | Sileru | Sircilla | Sirpur Kagaznagar | Sodam | Sompeta | Srikakulam | Srikalahasthi | Srisailam | Srungavarapukota | Sudhimalla | Sullarpet | Tadepalligudem | Tadipatri | Tanduru | Tanuku | Tekkali | Tenali | Thungaturthy | Tirivuru | Tirupathi | Tuni | Udaygiri | Ulvapadu | Uravakonda | Utnor | V.R. Puram | Vaimpalli | Vayalpad | Venkatgiri | Venkatgirikota | Vijayawada | Vikrabad | Vinjamuru | Vinukonda | Visakhapatnam | Vizayanagaram | Vizianagaram | Vuyyuru | Wanaparthy | Warangal | Wardhannapet | Yelamanchili | Yelavaram | Yeleswaram | Yellandu | Yellanuru | Yellareddy | Yerragondapalem | Zahirabad ";
    s_a[3] = " Along | Anini | Anjaw | Bameng | Basar | Changlang | Chowkhem | Daporizo | Dibang Valley | Dirang | Hayuliang | Huri | Itanagar | Jairampur | Kalaktung | Kameng | Khonsa | Kolaring | Kurung Kumey | Lohit | Lower Dibang Valley | Lower Subansiri | Mariyang | Mechuka | Miao | Nefra | Pakkekesang | Pangin | Papum Pare | Passighat | Roing | Sagalee | Seppa | Siang | Tali | Taliha | Tawang | Tezu | Tirap | Tuting | Upper Siang | Upper Subansiri | Yiang Kiag ";
    s_a[4] = " Abhayapuri | Baithalangshu | Barama | Barpeta Road | Bihupuria | Bijni | Bilasipara | Bokajan | Bokakhat | Boko | Bongaigaon | Cachar | Cachar Hills | Darrang | Dhakuakhana | Dhemaji | Dhubri | Dibrugarh | Digboi | Diphu | Goalpara | Gohpur | Golaghat | Guwahati | Hailakandi | Hajo | Halflong | Hojai | Howraghat | Jorhat | Kamrup | Karbi Anglong | Karimganj | Kokarajhar | Kokrajhar | Lakhimpur | Maibong | Majuli | Mangaldoi | Mariani | Marigaon | Moranhat | Morigaon | Nagaon | Nalbari | Rangapara | Sadiya | Sibsagar | Silchar | Sivasagar | Sonitpur | Tarabarihat | Tezpur | Tinsukia | Udalgiri | Udalguri | UdarbondhBarpeta";
    s_a[5] = " Adhaura | Amarpur | Araria | Areraj | Arrah | Arwal | Aurangabad | Bagaha | Banka | Banmankhi | Barachakia | Barauni | Barh | Barosi | Begusarai | Benipatti | Benipur | Bettiah | Bhabhua | Bhagalpur | Bhojpur | Bidupur | Biharsharif | Bikram | Bikramganj | Birpur | Buxar | Chakai | Champaran | Chapara | Dalsinghsarai | Danapur | Darbhanga | Daudnagar | Dhaka | Dhamdaha | Dumraon | Ekma | Forbesganj | Gaya | Gogri | Gopalganj | H.Kharagpur | Hajipur | Hathua | Hilsa | Imamganj | Jahanabad | Jainagar | Jamshedpur | Jamui | Jehanabad | Jhajha | Jhanjharpur | Kahalgaon | Kaimur (Bhabua) | Katihar | Katoria | Khagaria | Kishanganj | Korha | Lakhisarai | Madhepura | Madhubani | Maharajganj | Mahua | Mairwa | Mallehpur | Masrakh | Mohania | Monghyr | Motihari | Motipur | Munger | Muzaffarpur | Nabinagar | Nalanda | Narkatiaganj | Naugachia | Nawada | Pakribarwan | Pakridayal | Patna | Phulparas | Piro | Pupri | Purena | Purnia | Rafiganj | Rajauli | Ramnagar | Raniganj | Raxaul | Rohtas | Rosera | S.Bakhtiarpur | Saharsa | Samastipur | Saran | Sasaram | Seikhpura | Sheikhpura | Sheohar | Sherghati | Sidhawalia | Singhwara | Sitamarhi | Siwan | Sonepur | Supaul | Thakurganj | Triveniganj | Udakishanganj | Vaishali | Wazirganj";
    s_a[6] = " Chandigarh | Mani Marja";
    s_a[7] = " Ambikapur | Antagarh | Arang | Bacheli | Bagbahera | Bagicha | Baikunthpur | Balod | Balodabazar | Balrampur | Barpalli | Basana | Bastanar | Bastar | Bderajpur | Bemetara | Berla | Bhairongarh | Bhanupratappur | Bharathpur | Bhatapara | Bhilai | Bhilaigarh | Bhopalpatnam | Bijapur | Bilaspur | Bodla | Bokaband | Chandipara | Chhinagarh | Chhuriakala | Chingmut | Chuikhadan | Dabhara | Dallirajhara | Dantewada | Deobhog | Dhamda | Dhamtari | Dharamjaigarh | Dongargarh | Durg | Durgakondal | Fingeshwar | Gariaband | Garpa | Gharghoda | Gogunda | Ilamidi | Jagdalpur | Janjgir | Janjgir-Champa | Jarwa | Jashpur | Jashpurnagar | Kabirdham-Kawardha | Kanker | Kasdol | Kathdol | Kathghora | Kawardha | Keskal | Khairgarh | Kondagaon | Konta | Korba | Korea | Kota | Koyelibeda | Kuakunda | Kunkuri | Kurud | Lohadigundah | Lormi | Luckwada | Mahasamund | Makodi | Manendragarh | Manpur | Marwahi | Mohla | Mungeli | Nagri | Narainpur | Narayanpur | Neora | Netanar | Odgi | Padamkot | Pakhanjur | Pali | Pandaria | Pandishankar | Parasgaon | Pasan | Patan | Pathalgaon | Pendra | Pratappur | Premnagar | Raigarh | Raipur | Rajnandgaon | Rajpur | Ramchandrapur | Saraipali | Saranggarh | Sarona | Semaria | Shakti | Sitapur | Sukma | Surajpur | Surguja | Tapkara | Toynar | Udaipur | Uproda | Wadrainagar";
    s_a[8] = " Amal | Amli | Bedpa | Chikhli | Dadra & Nagar Haveli | Dahikhed | Dolara | Galonda | Kanadi | Karchond | Khadoli | Kharadpada | Kherabari | Kherdi | Kothar | Luari | Mashat | Rakholi | Rudana | Saili | Sili | Silvassa | Sindavni | Udva | Umbarkoi | Vansda | Vasona | Velugam ";
    s_a[9] = " Brancavare | Dagasi | Daman | Diu | Magarvara | Nagwa | Pariali | Passo Covo ";
    s_a[10] = " Central Delhi | East Delhi | New Delhi | North Delhi | North East Delhi | North West Delhi | South Delhi | South West Delhi | West Delhi ";
    s_a[11] = " Canacona | Candolim | Chinchinim | Cortalim | Goa | Jua | Madgaon | Mahem | Mapuca | Marmagao | Panji | Ponda | Sanvordem | Terekhol ";
    s_a[12] = " Ahmedabad | Ahwa | Amod | Amreli | Anand | Anjar | Ankaleshwar | Babra | Balasinor | Banaskantha | Bansada | Bardoli | Bareja | Baroda | Barwala | Bayad | Bhachav | Bhanvad | Bharuch | Bhavnagar | Bhiloda | Bhuj | Billimora | Borsad | Botad | Chanasma | Chhota Udaipur | Chotila | Dabhoi | Dahod | Damnagar | Dang | Danta | Dasada | Dediapada | Deesa | Dehgam | Deodar | Devgadhbaria | Dhandhuka | Dhanera | Dharampur | Dhari | Dholka | Dhoraji | Dhrangadhra | Dhrol | Dwarka | Fortsongadh | Gadhada | Gandhi Nagar | Gariadhar | Godhra | Gogodar | Gondal | Halol | Halvad | Harij | Himatnagar | Idar | Jambusar | Jamjodhpur | Jamkalyanpur | Jamnagar | Jasdan | Jetpur | Jhagadia | Jhalod | Jodia | Junagadh | Junagarh | Kalawad | Kalol | Kapad Wanj | Keshod | Khambat | Khambhalia | Khavda | Kheda | Khedbrahma | Kheralu | Kodinar | Kotdasanghani | Kunkawav | Kutch | Kutchmandvi | Kutiyana | Lakhpat | Lakhtar | Lalpur | Limbdi | Limkheda | Lunavada | M.M.Mangrol | Mahuva | Malia-Hatina | Maliya | Malpur | Manavadar | Mandvi | Mangrol | Mehmedabad | Mehsana | Miyagam | Modasa | Morvi | Muli | Mundra | Nadiad | Nakhatrana | Nalia | Narmada | Naswadi | Navasari | Nizar | Okha | Paddhari | Padra | Palanpur | Palitana | Panchmahals | Patan | Pavijetpur | Porbandar | Prantij | Radhanpur | Rahpar | Rajaula | Rajkot | Rajpipla | Ranavav | Sabarkantha | Sanand | Sankheda | Santalpur | Santrampur | Savarkundla | Savli | Sayan | Sayla | Shehra | Sidhpur | Sihor | Sojitra | Sumrasar | Surat | Surendranagar | Talaja | Thara | Tharad | Thasra | Una-Diu | Upleta | Vadgam | Vadodara | Valia | Vallabhipur | Valod | Valsad | Vanthali | Vapi | Vav | Veraval | Vijapur | Viramgam | Visavadar | Visnagar | Vyara | Waghodia | Wankaner ";
    s_a[13] = " Adampur Mandi | Ambala | Assandh | Bahadurgarh | Barara | Barwala | Bawal | Bawanikhera | Bhiwani | Charkhidadri | Cheeka | Chhachrauli | Dabwali | Ellenabad | Faridabad | Fatehabad | Ferojpur Jhirka | Gharaunda | Gohana | Gurgaon | Hansi | Hisar | Jagadhari | Jatusana | Jhajjar | Jind | Julana | Kaithal | Kalanaur | Kalanwali | Kalka | Karnal | Kosli | Kurukshetra | Loharu | Mahendragarh | Meham | Mewat | Mohindergarh | Naraingarh | Narnaul | Narwana | Nilokheri | Nuh | Palwal | Panchkula | Panipat | Pehowa | Ratia | Rewari | Rohtak | Safidon | Sirsa | Siwani | Sonipat | Tohana | Tohsam | Yamunanagar ";
    s_a[14] = " Amb | Arki | Banjar | Bharmour | Bilaspur | Chamba | Churah | Dalhousie | Dehra Gopipur | Hamirpur | Jogindernagar | Kalpa | Kangra | Kinnaur | Kullu | Lahaul | Mandi | Nahan | Nalagarh | Nirmand | Nurpur | Palampur | Pangi | Paonta | Pooh | Rajgarh | Rampur Bushahar | Rohru | Shimla | Sirmaur | Solan | Spiti | Sundernagar | Theog | Udaipur | Una";
    s_a[15] = " Akhnoor | Anantnag | Badgam | Bandipur | Baramulla | Basholi | Bedarwah | Budgam | Doda | Gulmarg | Jammu | Kalakot | Kargil | Karnah | Kathua | Kishtwar | Kulgam | Kupwara | Leh | Mahore | Nagrota | Nobra | Nowshera | Nyoma | Padam | Pahalgam | Patnitop | Poonch | Pulwama | Rajouri | Ramban | Ramnagar | Reasi | Samba | Srinagar | Udhampur | Vaishno Devi ";
    s_a[16] = " Bagodar | Baharagora | Balumath | Barhi | Barkagaon | Barwadih | Basia | Bermo | Bhandaria | Bhawanathpur | Bishrampur | Bokaro | Bolwa | Bundu | Chaibasa | Chainpur | Chakardharpur | Chandil | Chatra | Chavparan | Daltonganj | Deoghar | Dhanbad | Dumka | Dumri | Garhwa | Garu | Ghaghra | Ghatsila | Giridih | Godda | Gomia | Govindpur | Gumla | Hazaribagh | Hunterganj | Ichak | Itki | Jagarnathpur | Jamshedpur | Jamtara | Japla | Jharmundi | Jhinkpani | Jhumaritalaiya | Kathikund | Kharsawa | Khunti | Koderma | Kolebira | Latehar | Lohardaga | Madhupur | Mahagama | Maheshpur Raj | Mandar | Mandu | Manoharpur | Muri | Nagarutatri | Nala | Noamundi | Pakur | Palamu | Palkot | Patan | Rajdhanwar | Rajmahal | Ramgarh | Ranchi | Sahibganj | Saraikela | Simaria | Simdega | Singhbhum | Tisri | Torpa ";
    s_a[17] = " Afzalpur | Ainapur | Aland | Alur | Anekal | Ankola | Arsikere | Athani | Aurad | Bableshwar | Badami | Bagalkot | Bagepalli | Bailhongal | Bangalore | Bangalore Rural | Bangarpet | Bantwal | Basavakalyan | Basavanabagewadi | Basavapatna | Belgaum | Bellary | Belthangady | Belur | Bhadravati | Bhalki | Bhatkal | Bidar | Bijapur | Biligi | Chadchan | Challakere | Chamrajnagar | Channagiri | Channapatna | Channarayapatna | Chickmagalur | Chikballapur | Chikkaballapur | Chikkanayakanahalli | Chikkodi | Chikmagalur | Chincholi | Chintamani | Chitradurga | Chittapur | Cowdahalli | Davanagere | Deodurga | Devangere | Devarahippargi | Dharwad | Doddaballapur | Gadag | Gangavathi | Gokak | Gowribdanpur | Gubbi | Gulbarga | Gundlupet | H.B.Halli | H.D. Kote | Haliyal | Hampi | Hangal | Harapanahalli | Hassan | Haveri | Hebri | Hirekerur | Hiriyur | Holalkere | Holenarsipur | Honnali | Honnavar | Hosadurga | Hosakote | Hosanagara | Hospet | Hubli | Hukkeri | Humnabad | Hungund | Hunsagi | Hunsur | Huvinahadagali | Indi | Jagalur | Jamkhandi | Jewargi | Joida | K.R. Nagar | Kadur | Kalghatagi | Kamalapur | Kanakapura | Kannada | Kargal | Karkala | Karwar | Khanapur | Kodagu | Kolar | Kollegal | Koppa | Koppal | Koratageri | Krishnarajapet | Kudligi | Kumta | Kundapur | Kundgol | Kunigal | Kurugodu | Kustagi | Lingsugur | Madikeri | Madugiri | Malavalli | Malur | Mandya | Mangalore | Manipal | Manvi | Mashal | Molkalmuru | Mudalgi | Muddebihal | Mudhol | Mudigere | Mulbagal | Mundagod | Mundargi | Murugod | Mysore | Nagamangala | Nanjangud | Nargund | Narsimrajapur | Navalgund | Nelamangala | Nimburga | Pandavapura | Pavagada | Puttur | Raibag | Raichur | Ramdurg | Ranebennur | Ron | Sagar | Sakleshpur | Salkani | Sandur | Saundatti | Savanur | Sedam | Shahapur | Shankarnarayana | Shikaripura | Shimoga | Shirahatti | Shorapur | Siddapur | Sidlaghatta | Sindagi | Sindhanur | Sira | Sirsi | Siruguppa | Somwarpet | Sorab | Sringeri | Sriniwaspur | Srirangapatna | Sullia | T. Narsipur | Tallak | Tarikere | Telgi | Thirthahalli | Tiptur | Tumkur | Turuvekere | Udupi | Virajpet | Wadi | Yadgiri | Yelburga | Yellapur ";
    s_a[18] = " Adimaly | Adoor | Agathy | Alappuzha | Alathur | Alleppey | Alwaye | Amini | Androth | Attingal | Badagara | Bitra | Calicut | Cannanore | Chetlet | Ernakulam | Idukki | Irinjalakuda | Kadamath | Kalpeni | Kalpetta | Kanhangad | Kanjirapally | Kannur | Karungapally | Kasargode | Kavarathy | Kiltan | Kochi | Koduvayur | Kollam | Kottayam | Kovalam | Kozhikode | Kunnamkulam | Malappuram | Mananthodi | Manjeri | Mannarghat | Mavelikkara | Minicoy | Munnar | Muvattupuzha | Nedumandad | Nedumgandam | Nilambur | Palai | Palakkad | Palghat | Pathaanamthitta | Pathanamthitta | Payyanur | Peermedu | Perinthalmanna | Perumbavoor | Punalur | Quilon | Ranni | Shertallai | Shoranur | Taliparamba | Tellicherry | Thiruvananthapuram | Thodupuzha | Thrissur | Tirur | Tiruvalla | Trichur | Trivandrum | Uppala | Vadakkanchery | Vikom | Wayanad ";
    s_a[19] = " Agatti Island | Bingaram Island | Bitra Island | Chetlat Island | Kadmat Island | Kalpeni Island | Kavaratti Island | Kiltan Island | Lakshadweep Sea | Minicoy Island | North Island | South Island ";
    s_a[20] = " Agar | Ajaigarh | Alirajpur | Amarpatan | Amarwada | Ambah | Anuppur | Arone | Ashoknagar | Ashta | Atner | Babaichichli | Badamalhera | Badarwsas | Badnagar | Badnawar | Badwani | Bagli | Baihar | Balaghat | Baldeogarh | Baldi | Bamori | Banda | Bandhavgarh | Bareli | Baroda | Barwaha | Barwani | Batkakhapa | Begamganj | Beohari | Berasia | Berchha | Betul | Bhainsdehi | Bhander | Bhanpura | Bhikangaon | Bhimpur | Bhind | Bhitarwar | Bhopal | Biaora | Bijadandi | Bijawar | Bijaypur | Bina | Birsa | Birsinghpur | Budhni | Burhanpur | Buxwaha | Chachaura | Chanderi | Chaurai | Chhapara | Chhatarpur | Chhindwara | Chicholi | Chitrangi | Churhat | Dabra | Damoh | Datia | Deori | Deosar | Depalpur | Dewas | Dhar | Dharampuri | Dindori | Gadarwara | Gairatganj | Ganjbasoda | Garoth | Ghansour | Ghatia | Ghatigaon | Ghorandogri | Ghughari | Gogaon | Gohad | Goharganj | Gopalganj | Gotegaon | Gourihar | Guna | Gunnore | Gwalior | Gyraspur | Hanumana | Harda | Harrai | Harsud | Hatta | Hoshangabad | Ichhawar | Indore | Isagarh | Itarsi | Jabalpur | Jabera | Jagdalpur | Jaisinghnagar | Jaithari | Jaitpur | Jaitwara | Jamai | Jaora | Jatara | Jawad | Jhabua | Jobat | Jora | Kakaiya | Kannod | Kannodi | Karanjia | Kareli | Karera | Karhal | Karpa | Kasrawad | Katangi | Katni | Keolari | Khachrod | Khajuraho | Khakner | Khalwa | Khandwa | Khaniadhana | Khargone | Khategaon | Khetia | Khilchipur | Khirkiya | Khurai | Kolaras | Kotma | Kukshi | Kundam | Kurwai | Kusmi | Laher | Lakhnadon | Lamta | Lanji | Lateri | Laundi | Maheshwar | Mahidpurcity | Maihar | Majhagwan | Majholi | Malhargarh | Manasa | Manawar | Mandla | Mandsaur | Manpur | Mauganj | Mawai | Mehgaon | Mhow | Morena | Multai | Mungaoli | Nagod | Nainpur | Narsingarh | Narsinghpur | Narwar | Nasrullaganj | Nateran | Neemuch | Niwari | Niwas | Nowgaon | Pachmarhi | Pandhana | Pandhurna | Panna | Parasia | Patan | Patera | Patharia | Pawai | Petlawad | Pichhore | Piparia | Pohari | Prabhapattan | Punasa | Pushprajgarh | Raghogarh | Raghunathpur | Rahatgarh | Raisen | Rajgarh | Rajpur | Ratlam | Rehli | Rewa | Sabalgarh | Sagar | Sailana | Sanwer | Sarangpur | Sardarpur | Satna | Saunsar | Sehore | Sendhwa | Seondha | Seoni | Seonimalwa | Shahdol | Shahnagar | Shahpur | Shajapur | Sheopur | Sheopurkalan | Shivpuri | Shujalpur | Sidhi | Sihora | Silwani | Singrauli | Sirmour | Sironj | Sitamau | Sohagpur | Sondhwa | Sonkatch | Susner | Tamia | Tarana | Tendukheda | Teonthar | Thandla | Tikamgarh | Timarani | Udaipura | Ujjain | Umaria | Umariapan | Vidisha | Vijayraghogarh | Waraseoni | Zhirnia ";
    s_a[21] = " Achalpur | Aheri | Ahmednagar | Ahmedpur | Ajara | Akkalkot | Akola | Akole | Akot | Alibagh | Amagaon | Amalner | Ambad | Ambejogai | Amravati | Arjuni Merogaon | Arvi | Ashti | Atpadi | Aurangabad | Ausa | Babhulgaon | Balapur | Baramati | Barshi Takli | Barsi | Basmatnagar | Bassein | Beed | Bhadrawati | Bhamregadh | Bhandara | Bhir | Bhiwandi | Bhiwapur | Bhokar | Bhokardan | Bhoom | Bhor | Bhudargad | Bhusawal | Billoli | Brahmapuri | Buldhana | Butibori | Chalisgaon | Chamorshi | Chandgad | Chandrapur | Chandur | Chanwad | Chhikaldara | Chikhali | Chinchwad | Chiplun | Chopda | Chumur | Dahanu | Dapoli | Darwaha | Daryapur | Daund | Degloor | Delhi Tanda | Deogad | Deolgaonraja | Deori | Desaiganj | Dhadgaon | Dhanora | Dharani | Dhiwadi | Dhule | Dhulia | Digras | Dindori | Edalabad | Erandul | Etapalli | Gadhchiroli | Gadhinglaj | Gaganbavada | Gangakhed | Gangapur | Gevrai | Ghatanji | Golegaon | Gondia | Gondpipri | Goregaon | Guhagar | Hadgaon | Hatkangale | Hinganghat | Hingoli | Hingua | Igatpuri | Indapur | Islampur | Jalgaon | Jalna | Jamkhed | Jamner | Jath | Jawahar | Jintdor | Junnar | Kagal | Kaij | Kalamb | Kalamnuri | Kallam | Kalmeshwar | Kalwan | Kalyan | Kamptee | Kandhar | Kankavali | Kannad | Karad | Karjat | Karmala | Katol | Kavathemankal | Kedgaon | Khadakwasala | Khamgaon | Khed | Khopoli | Khultabad | Kinwat | Kolhapur | Kopargaon | Koregaon | Kudal | Kuhi | Kurkheda | Kusumba | Lakhandur | Langa | Latur | Lonar | Lonavala | Madangad | Madha | Mahabaleshwar | Mahad | Mahagaon | Mahasala | Mahaswad | Malegaon | Malgaon | Malgund | Malkapur | Malsuras | Malwan | Mancher | Mangalwedha | Mangaon | Mangrulpur | Manjalegaon | Manmad | Maregaon | Mehda | Mekhar | Mohadi | Mohol | Mokhada | Morshi | Mouda | Mukhed | Mul | Mumbai | Murbad | Murtizapur | Murud | Nagbhir | Nagpur | Nahavara | Nanded | Nandgaon | Nandnva | Nandurbar | Narkhed | Nashik | Navapur | Ner | Newasa | Nilanga | Niphad | Omerga | Osmanabad | Pachora | Paithan | Palghar | Pali | Pandharkawada | Pandharpur | Panhala | Paranda | Parbhani | Parner | Parola | Parseoni | Partur | Patan | Pathardi | Pathari | Patoda | Pauni | Peint | Pen | Phaltan | Pimpalner | Pirangut | Poladpur | Pune | Pusad | Pusegaon | Radhanagar | Rahuri | Raigad | Rajapur | Rajgurunagar | Rajura | Ralegaon | Ramtek | Ratnagiri | Raver | Risod | Roha | Sakarwadi | Sakoli | Sakri | Salekasa | Samudrapur | Sangamner | Sanganeshwar | Sangli | Sangola | Sanguem | Saoner | Saswad | Satana | Satara | Sawantwadi | Seloo | Shahada | Shahapur | Shahuwadi | Shevgaon | Shirala | Shirol | Shirpur | Shirur | Shirwal | Sholapur | Shri Rampur | Shrigonda | Shrivardhan | Sillod | Sinderwahi | Sindhudurg | Sindkheda | Sindkhedaraja | Sinnar | Sironcha | Soyegaon | Surgena | Talasari | Talegaon S.Ji Pant | Taloda | Tasgaon | Thane | Tirora | Tiwasa | Trimbak | Tuljapur | Tumsar | Udgir | Umarkhed | Umrane | Umrer | Urlikanchan | Vaduj | Velhe | Vengurla | Vijapur | Vita | Wada | Wai | Walchandnagar | Wani | Wardha | Warlydwarud | Warora | Washim | Wathar | Yavatmal | Yawal | Yeola | Yeotmal ";
    s_a[22] = " Bishnupur | Chakpikarong | Chandel | Chattrik | Churachandpur | Imphal | Jiribam | Kakching | Kalapahar | Mao | Mulam | Parbung | Sadarhills | Saibom | Sempang | Senapati | Sochumer | Taloulong | Tamenglong | Thinghat | Thoubal | Ukhrul ";
    s_a[23] = " Amlaren | Baghmara | Cherrapunjee | Dadengiri | Garo Hills | Jaintia Hills | Jowai | Khasi Hills | Khliehriat | Mariang | Mawkyrwat | Nongpoh | Nongstoin | Resubelpara | Ri Bhoi | Shillong | Tura | Williamnagar";
    s_a[24] = " Aizawl | Champhai | Demagiri | Kolasib | Lawngtlai | Lunglei | Mamit | Saiha | Serchhip";
    s_a[25] = " Dimapur | Jalukie | Kiphire | Kohima | Mokokchung | Mon | Phek | Tuensang | Wokha | Zunheboto ";
    s_a[26] = " Anandapur | Angul | Anugul | Aska | Athgarh | Athmallik | Attabira | Bagdihi | Balangir | Balasore | Baleswar | Baliguda | Balugaon | Banaigarh | Bangiriposi | Barbil | Bargarh | Baripada | Barkot | Basta | Berhampur | Betanati | Bhadrak | Bhanjanagar | Bhawanipatna | Bhubaneswar | Birmaharajpur | Bisam Cuttack | Boriguma | Boudh | Buguda | Chandbali | Chhatrapur | Chhendipada | Cuttack | Daringbadi | Daspalla | Deodgarh | Deogarh | Dhanmandal | Dharamgarh | Dhenkanal | Digapahandi | Dunguripali | G. Udayagiri | Gajapati | Ganjam | Ghatgaon | Gudari | Gunupur | Hemgiri | Hindol | Jagatsinghapur | Jajpur | Jamankira | Jashipur | Jayapatna | Jeypur | Jharigan | Jharsuguda | Jujumura | Kalahandi | Kalimela | Kamakhyanagar | Kandhamal | Kantabhanji | Kantamal | Karanjia | Kashipur | Kendrapara | Kendujhar | Keonjhar | Khalikote | Khordha | Khurda | Komana | Koraput | Kotagarh | Kuchinda | Lahunipara | Laxmipur | M. Rampur | Malkangiri | Mathili | Mayurbhanj | Mohana | Motu | Nabarangapur | Naktideul | Nandapur | Narlaroad | Narsinghpur | Nayagarh | Nimapara | Nowparatan | Nowrangapur | Nuapada | Padampur | Paikamal | Palla Hara | Papadhandi | Parajang | Pardip | Parlakhemundi | Patnagarh | Pattamundai | Phiringia | Phulbani | Puri | Puruna Katak | R. Udayigiri | Rairakhol | Rairangpur | Rajgangpur | Rajkhariar | Rayagada | Rourkela | Sambalpur | Sohela | Sonapur | Soro | Subarnapur | Sunabeda | Sundergarh | Surada | T. Rampur | Talcher | Telkoi | Titlagarh | Tumudibandha | Udala | Umerkote ";
    s_a[27] = " Bahur | Karaikal | Mahe | Pondicherry | Purnankuppam | Valudavur | Villianur | Yanam ";
    s_a[28] = " Abohar | Ajnala | Amritsar | Balachaur | Barnala | Batala | Bathinda | Chandigarh | Dasua | Dinanagar | Faridkot | Fatehgarh Sahib | Fazilka | Ferozepur | Garhashanker | Goindwal | Gurdaspur | Guruharsahai | Hoshiarpur | Jagraon | Jalandhar | Jugial | Kapurthala | Kharar | Kotkapura | Ludhiana | Malaut | Malerkotla | Mansa | Moga | Muktasar | Nabha | Nakodar | Nangal | Nawanshahar | Nawanshahr | Pathankot | Patiala | Patti | Phagwara | Phillaur | Phulmandi | Quadian | Rajpura | Raman | Rayya | Ropar | Rupnagar | Samana | Samrala | Sangrur | Sardulgarh | Sarhind | SAS Nagar | Sultanpur Lodhi | Sunam | Tanda Urmar | Tarn Taran | Zira ";
    s_a[29] = " Abu Road | Ahore | Ajmer | Aklera | Alwar | Amber | Amet | Anupgarh | Asind | Aspur | Atru | Bagidora | Bali | Bamanwas | Banera | Bansur | Banswara | Baran | Bari | Barisadri | Barmer | Baseri | Bassi | Baswa | Bayana | Beawar | Begun | Behror | Bhadra | Bharatpur | Bhilwara | Bhim | Bhinmal | Bikaner | Bilara | Bundi | Chhabra | Chhipaborad | Chirawa | Chittorgarh | Chohtan | Churu | Dantaramgarh | Dausa | Deedwana | Deeg | Degana | Deogarh | Deoli | Desuri | Dhariawad | Dholpur | Digod | Dudu | Dungarpur | Dungla | Fatehpur | Gangapur | Gangdhar | Gerhi | Ghatol | Girwa | Gogunda | Hanumangarh | Hindaun | Hindoli | Hurda | Jahazpur | Jaipur | Jaisalmer | Jalore | Jhalawar | Jhunjhunu | Jodhpur | Kaman | Kapasan | Karauli | Kekri | Keshoraipatan | Khandar | Kherwara | Khetri | Kishanganj | Kishangarh | Kishangarhbas | Kolayat | Kota | Kotputli | Kotra | Kotri | Kumbalgarh | Kushalgarh | Ladnun | Ladpura | Lalsot | Laxmangarh | Lunkaransar | Mahuwa | Malpura | Malvi | Mandal | Mandalgarh | Mandawar | Mangrol | Marwar-Jn | Merta | Nadbai | Nagaur | Nainwa | Nasirabad | Nathdwara | Nawa | Neem Ka Thana | Newai | Nimbahera | Nohar | Nokha | Onli | Osian | Pachpadara | Pachpahar | Padampur | Pali | Parbatsar | Phagi | Phalodi | Pilani | Pindwara | Pipalda | Pirawa | Pokaran | Pratapgarh | Raipur | Raisinghnagar | Rajgarh | Rajsamand | Ramganj Mandi | Ramgarh | Rashmi | Ratangarh | Reodar | Rupbas | Sadulshahar | Sagwara | Sahabad | Salumber | Sanchore | Sangaria | Sangod | Sapotra | Sarada | Sardarshahar | Sarwar | Sawai Madhopur | Shahapura | Sheo | Sheoganj | Shergarh | Sikar | Sirohi | Siwana | Sojat | Sri Dungargarh | Sri Ganganagar | Sri Karanpur | Sri Madhopur | Sujangarh | Taranagar | Thanaghazi | Tibbi | Tijara | Todaraisingh | Tonk | Udaipur | Udaipurwati | Uniayara | Vallabhnagar | Viratnagar ";
    s_a[30] = " Barmiak | Be | Bhurtuk | Chhubakha | Chidam | Chubha | Chumikteng | Dentam | Dikchu | Dzongri | Gangtok | Gauzing | Gyalshing | Hema | Kerung | Lachen | Lachung | Lema | Lingtam | Lungthu | Mangan | Namchi | Namthang | Nanga | Nantang | Naya Bazar | Padamachen | Pakhyong | Pemayangtse | Phensang | Rangli | Rinchingpong | Sakyong | Samdong | Singtam | Siniolchu | Sombari | Soreng | Sosing | Tekhug | Temi | Tsetang | Tsomgo | Tumlong | Yangang | Yumtang ";
    s_a[31] = " Ambasamudram | Anamali | Arakandanallur | Arantangi | Aravakurichi | Ariyalur | Arkonam | Arni | Aruppukottai | Attur | Avanashi | Batlagundu | Bhavani | Chengalpattu | Chengam | Chennai | Chidambaram | Chingleput | Coimbatore | Courtallam | Cuddalore | Cumbum | Denkanikoitah | Devakottai | Dharampuram | Dharmapuri | Dindigul | Erode | Gingee | Gobichettipalayam | Gudalur | Gudiyatham | Harur | Hosur | Jayamkondan | Kallkurichi | Kanchipuram | Kangayam | Kanyakumari | Karaikal | Karaikudi | Karur | Keeranur | Kodaikanal | Kodumudi | Kotagiri | Kovilpatti | Krishnagiri | Kulithalai | Kumbakonam | Kuzhithurai | Madurai | Madurantgam | Manamadurai | Manaparai | Mannargudi | Mayiladuthurai | Mayiladutjurai | Mettupalayam | Metturdam | Mudukulathur | Mulanur | Musiri | Nagapattinam | Nagarcoil | Namakkal | Nanguneri | Natham | Neyveli | Nilgiris | Oddanchatram | Omalpur | Ootacamund | Ooty | Orathanad | Palacode | Palani | Palladum | Papanasam | Paramakudi | Pattukottai | Perambalur | Perundurai | Pollachi | Polur | Pondicherry | Ponnamaravathi | Ponneri | Pudukkottai | Rajapalayam | Ramanathapuram | Rameshwaram | Ranipet | Rasipuram | Salem | Sankagiri | Sankaran | Sathiyamangalam | Sivaganga | Sivakasi | Sriperumpudur | Srivaikundam | Tenkasi | Thanjavur | Theni | Thirumanglam | Thiruraipoondi | Thoothukudi | Thuraiyure | Tindivanam | Tiruchendur | Tiruchengode | Tiruchirappalli | Tirunelvelli | Tirupathur | Tirupur | Tiruttani | Tiruvallur | Tiruvannamalai | Tiruvarur | Tiruvellore | Tiruvettipuram | Trichy | Tuticorin | Udumalpet | Ulundurpet | Usiliampatti | Uthangarai | Valapady | Valliyoor | Vaniyambadi | Vedasandur | Vellore | Velur | Vilathikulam | Villupuram | Virudhachalam | Virudhunagar | Wandiwash | Yercaud ";
    s_a[32] = " Agartala | Ambasa | Bampurbari | Belonia | Dhalai | Dharam Nagar | Kailashahar | Kamal Krishnabari | Khopaiyapara | Khowai | Phuldungsei | Radha Kishore Pur | Tripura ";
    s_a[33] = " Achhnera | Agra | Akbarpur | Aliganj | Aligarh | Allahabad | Ambedkar Nagar | Amethi | Amiliya | Amroha | Anola | Atrauli | Auraiya | Azamgarh | Baberu | Badaun | Baghpat | Bagpat | Baheri | Bahraich | Ballia | Balrampur | Banda | Bansdeeh | Bansgaon | Bansi | Barabanki | Bareilly | Basti | Bhadohi | Bharthana | Bharwari | Bhogaon | Bhognipur | Bidhuna | Bijnore | Bikapur | Bilari | Bilgram | Bilhaur | Bindki | Bisalpur | Bisauli | Biswan | Budaun | Budhana | Bulandshahar | Bulandshahr | Capianganj | Chakia | Chandauli | Charkhari | Chhata | Chhibramau | Chirgaon | Chitrakoot | Chunur | Dadri | Dalmau | Dataganj | Debai | Deoband | Deoria | Derapur | Dhampur | Domariyaganj | Dudhi | Etah | Etawah | Faizabad | Farrukhabad | Fatehpur | Firozabad | Garauth | Garhmukteshwar | Gautam Buddha Nagar | Ghatampur | Ghaziabad | Ghazipur | Ghosi | Gonda | Gorakhpur | Gunnaur | Haidergarh | Hamirpur | Hapur | Hardoi | Harraiya | Hasanganj | Hasanpur | Hathras | Jalalabad | Jalaun | Jalesar | Jansath | Jarar | Jasrana | Jaunpur | Jhansi | Jyotiba Phule Nagar | Kadipur | Kaimganj | Kairana | Kaisarganj | Kalpi | Kannauj | Kanpur | Karchhana | Karhal | Karvi | Kasganj | Kaushambi | Kerakat | Khaga | Khair | Khalilabad | Kheri | Konch | Kumaon | Kunda | Kushinagar | Lalganj | Lalitpur | Lucknow | Machlishahar | Maharajganj | Mahoba | Mainpuri | Malihabad | Mariyahu | Math | Mathura | Mau | Maudaha | Maunathbhanjan | Mauranipur | Mawana | Meerut | Mehraun | Meja | Mirzapur | Misrikh | Modinagar | Mohamdabad | Mohamdi | Moradabad | Musafirkhana | Muzaffarnagar | Nagina | Najibabad | Nakur | Nanpara | Naraini | Naugarh | Nawabganj | Nighasan | Noida | Orai | Padrauna | Pahasu | Patti | Pharenda | Phoolpur | Phulpur | Pilibhit | Pitamberpur | Powayan | Pratapgarh | Puranpur | Purwa | Raibareli | Rampur | Ramsanehi Ghat | Rasara | Rath | Robertsganj | Sadabad | Safipur | Sagri | Saharanpur | Sahaswan | Sahjahanpur | Saidpur | Salempur | Salon | Sambhal | Sandila | Sant Kabir Nagar | Sant Ravidas Nagar | Sardhana | Shahabad | Shahganj | Shahjahanpur | Shikohabad | Shravasti | Siddharthnagar | Sidhauli | Sikandra Rao | Sikandrabad | Sitapur | Siyana | Sonbhadra | Soraon | Sultanpur | Tanda | Tarabganj | Tilhar | Unnao | Utraula | Varanasi | Zamania ";
    s_a[34] = " Almora | Bageshwar | Bhatwari | Chakrata | Chamoli | Champawat | Dehradun | Deoprayag | Dharchula | Dunda | Haldwani | Haridwar | Joshimath | Karan Prayag | Kashipur | Khatima | Kichha | Lansdown | Munsiari | Mussoorie | Nainital | Pantnagar | Partapnagar | Pauri Garhwal | Pithoragarh | Purola | Rajgarh | Ranikhet | Roorkee | Rudraprayag | Tehri Garhwal | Udham Singh Nagar | Ukhimath | Uttarkashi ";
    s_a[35] = " Adra | Alipurduar | Amlagora | Arambagh | Asansol | Balurghat | Bankura | Bardhaman | Basirhat | Berhampur | Bethuadahari | Birbhum | Birpara | Bishanpur | Bolpur | Bongoan | Bulbulchandi | Burdwan | Calcutta | Canning | Champadanga | Contai | Cooch Behar | Daimond Harbour | Dalkhola | Dantan | Darjeeling | Dhaniakhali | Dhuliyan | Dinajpur | Dinhata | Durgapur | Gangajalghati | Gangarampur | Ghatal | Guskara | Habra | Haldia | Harirampur | Harishchandrapur | Hooghly | Howrah | Islampur | Jagatballavpur | Jalpaiguri | Jhalda | Jhargram | Kakdwip | Kalchini | Kalimpong | Kalna | Kandi | Karimpur | Katwa | Kharagpur | Khatra | Krishnanagar | Mal Bazar | Malda | Manbazar | Mathabhanga | Medinipur | Mekhliganj | Mirzapur | Murshidabad | Nadia | Nagarakata | Nalhati | Nayagarh | Parganas | Purulia | Raiganj | Rampur Hat | Ranaghat | Seharabazar | Siliguri | Suri | Takipur | Tamluk";

    const location = useLocation();

    const isFromOtp = location.state && location.state.fromOtp;
    console.log("is form otp : ", isFromOtp);
    const [registrationStatus, setRegistrationStatus] = useState(false);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    var [isUserRegistered, setUserRegistered] = useState(false);
    var [isUserDocuments, setUserDocuments] = useState(false);

    const history = useNavigate();
    const [user, setUser] = useState({
        username: '',
        phoneNo: '',
        aadharNo: '',
        dob: '',
        email: '',
        password: '',
        address: '',
        city: '',
        state: ''
    });
    
    const [user1, setUser1] = useState({
        income: "",
        aadharFile: "",
        incomeCertificate: "",
        fatherAadharcard: "",
        marksheet: "",
        latestMarksheet: ""
    });

    const [errors, setErrors] = useState({
        username: '',
        phoneNo: '',
        aadharNo: '',
        dob: '',
        email: '',
        password: '',
    });

    const [aadharNumber, setAadhar] = useState();

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
        const validationErrors = validateField(name, value);
        setErrors({ ...errors, [name]: validationErrors });
    };
    var incomSpanStatus = true;
    const handleFileChange1 = (e, id, no) => {


        const inputElement = document.getElementById(id);
        const labelElement = document.getElementById('fileLabel' + no);
        console.log("no : ", no);
        console.log("label Element : ", labelElement);
        console.log("input Element : ", inputElement);

        if (e.target.type === 'file') {
            if (inputElement.files.length > 0) {
                labelElement.innerText = inputElement.files[0].name;
            } else {
                labelElement.innerText = 'choose File';
            }
            const name = e.target.name;
            const file = e.target.files[0];
            setUser1({ ...user1, [name]: file });
            console.log(user1)
            console.log("file name : ", file);
            console.log("file: ", file);
        } else {
            const name = e.target.name;
            const value = e.target.value;
            setUser1({ ...user1, [name]: value });
            console.log("field name : ", name);
            console.log("field value : ", value);
        }
        // e.target.reset();
    };
    let checkAadharflag = true;
    const handlecheckAadhar = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let rsg = /^[1-9]{12}$/

        if (value.trim() == "") {
            document.getElementById("aadharCheckSpan").style.color = "red";
            document.getElementById("aadharCheckSpan").innerHTML = "Addhar Number Required";
            checkAadharflag = false;
        } else if ((/^[A-Za-z!@#$%^&*()_+:"<.,/]+$/).test(value)) {
            document.getElementById("aadharCheckSpan").style.color = "red";
            document.getElementById("aadharCheckSpan").innerHTML = "Addhar Number Must be a Digit only";
            checkAadharflag = false;
        }
        else if (!rsg.test(value)) {
            document.getElementById("aadharCheckSpan").style.color = "red";
            document.getElementById("aadharCheckSpan").innerHTML = "Addhar Number Must be a 12 Digit only";
            checkAadharflag = false;
        }
        else {
            document.getElementById("aadharCheckSpan").style.color = "green";
            document.getElementById("aadharCheckSpan").innerHTML = "Looking Good";
            setAadhar(value);
        }
        console.log("Adhar number name field : ", name);
        console.log("Adhar number value field : ", value);
        console.log("check aadhar card number : ", aadharNumber);
    }

    const checkAadharNumber = (e) => {
        if (checkAadharflag) {
            if (e) {
                e.preventDefault();
            }
            toggleLoader();
            axios.post(`http://localhost:3002/candidate/checkAadharNumber/${aadharNumber}`).then((response) => {
                toggleLoader();
                console.log("result", response.data);

                if (response.data == false) {
                    alert("not register please register first");
                }
                else if (response.data == 1) {
                    alert("please call the admin for 4th attempt");
                }
                else {
                    alert("login success");
                    document.getElementById("collapseTwo").classList.add("show");
                    document.getElementById("collapseOne").classList.remove("show");
                    // e.target.reset();
                    Cookie.set("aadharNumber", response.data, {
                        expires: 1,
                        secure: true,
                        sameSite: "strict",
                        path: "/"
                    });

                    // document.getElementById("firstaccordianloginform").style.display = 'none'
                    // document.getElementById("secondaccordianform").style.display = 'block'
                }
            }).catch((error) => {
                console.log('', error);
            })
        }
        else {
            alert("Invalid details");
        }
    }

    const registrationform = () => {
        document.getElementById("firstaccordianloginform").style.display = "none"
        document.getElementById("firstaccordianbasicdetailform").style.display = "block"
    }

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'username':
                var reg = /^[A-Za-z\s]+$/;
                if (value.trim() == "") {
                    document.getElementById("username").style.color = "red";
                    document.getElementById("usertext").style.color = "red";
                    document.getElementById("usertext").innerHTML = "Name Required";
                    username = false;
                    return false
                }
                else if (reg.test(value)) {
                    document.getElementById('username').style.color = "green";
                    document.getElementById('usertext').style.color = "green";
                    document.getElementById("usertext").innerHTML = "Looking Good";
                    username = true;
                    return true
                }
                else {
                    console.log("usertext")
                    document.getElementById('username').style.color = "red";
                    document.getElementById('usertext').style.color = "red";
                    document.getElementById("usertext").innerHTML = "Invalid name please enter only character";
                    username = false;
                    return false;
                }

                break;
            case 'city':
                if (value == '') {
                    document.getElementById("city").innerHTML = "City Required";
                    City = false;
                    return false;
                }
                else {
                    City = true;
                    return true;
                }
                break;
            case 'state':
                if (value == '') {
                    document.getElementById("state").innerHTML = "City Required";
                    State = false;
                    return false;
                }
                else {
                    State = true;
                    return true;
                }
                break;
            case 'phoneNo':
                var reg = /^[6789][0-9]{9}$/;
                if (value.trim() == '') {
                    document.getElementById("phoneNo").style.color = "red";
                    document.getElementById("phone").style.color = "red";
                    document.getElementById("phone").innerHTML = "Mobile Number Required";
                    phone = false;
                    return false;
                }
                else if ((/^[A-Za-z]+$/).test(value)) {
                    document.getElementById("phoneNo").style.color = "red";
                    document.getElementById("phone").style.color = "red";
                    document.getElementById("phone").innerHTML = "Mobile Number must be a digit only";
                    phone = false;
                    return false;
                }
                else if (!reg.test(value)) {
                    document.getElementById("phoneNo").style.color = "red";
                    document.getElementById("phone").style.color = "red";
                    document.getElementById("phone").innerHTML = "Enter 10 digits Mobile number";
                    phone = false;
                    return false;
                }
                else {

                    document.getElementById("phoneNo").style.color = "green";
                    document.getElementById("phone").style.color = "green";
                    document.getElementById("phone").innerHTML = "Looking Good";
                    phone = true;
                    return true;

                }

                break;
            case 'aadharNo':
                let rsg = /^[1-9]{12}$/

                if (value.trim() == "") {
                    document.getElementById("aadharNo").style.color = "red";
                    document.getElementById("adharno").style.color = "red";
                    document.getElementById("adharno").innerHTML = "Addhar Number Required";
                    Adhaar = false;
                    return false
                } else if ((/^[A-Za-z!@#$%^&*()_+:"<.,/]+$/).test(value)) {
                    document.getElementById("aadharNo").style.color = "red";
                    document.getElementById("adharno").style.color = "red";
                    document.getElementById("adharno").innerHTML = "Addhar Number Must be a Digit only";
                    Adhaar = false;
                    return false
                }
                else if (!rsg.test(value)) {
                    document.getElementById("aadharNo").style.color = "red";
                    document.getElementById("adharno").style.color = "red";
                    document.getElementById("adharno").innerHTML = "Addhar Number Must be a 12 Digit only";
                    Adhaar = false;
                    return false
                }
                else {
                    document.getElementById("aadharNo").style.color = "green";
                    document.getElementById("adharno").style.color = "green";
                    document.getElementById("adharno").innerHTML = "Looking Good";
                    Adhaar = true;
                    return true
                }

                break;
            case 'email':
                var email = document.getElementById("login_email");
                if (value.trim() == "") {
                    document.getElementById("email").style.color = "red";
                    document.getElementById("emailSpan").style.color = "red";
                    document.getElementById("emailSpan").innerHTML = "Email Required";
                    checkemail = false;
                    return false;
                }
                else {
                    var reg = /^\w+([\.-])?\w*@[a-z]*([\.][a-z]{2,3})+$/;
                    if (reg.test(value)) {
                        document.getElementById("email").style.color = "green";
                        document.getElementById("emailSpan").style.color = "green";
                        document.getElementById("emailSpan").innerHTML = "Looking Good";
                        checkemail = true;
                        return true;
                    }
                    else {
                        document.getElementById("email").style.color = "red";
                        document.getElementById("emailSpan").style.color = "red";
                        document.getElementById("emailSpan").innerHTML = "Invalid email";
                        checkemail = false;
                        return false;
                    }
                }

                break;
            case 'address':
                if (value == "") {
                    document.getElementById("address").style.color = "red";
                    document.getElementById("add").style.color = "red";
                    document.getElementById("add").innerHTML = "Address Required";
                    Address = false;
                    return false;
                }
                else {
                    document.getElementById("address").style.color = "green";
                    document.getElementById("add").innerHTML = "";
                    Address = true;
                    return true;
                }
                break;
            case 'password':
                if (value.trim() == "") {
                    document.getElementById("password").style.color = "red";
                    document.getElementById("password").innerHTML = "Password Required";
                    pass = false;
                    return false;
                }
                else {
                    // const reg =  /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,20}$/;
                    // var reg = /^(?=.+?[A-Z])(?=.+?[a-z])(?=.+?[~!@#$%^&*()_+])(?=.+?[0-9]).{8}$/;
                    // var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    if (reg.test(value)) {
                        document.getElementById("password").style.color = "green";
                        document.getElementById("password").innerHTML = "Valid Password";
                        pass = true;
                        return true;
                    }
                    else {
                        document.getElementById("password").style.color = "red";
                        document.getElementById("password").innerHTML = "Invalid Password";
                        pass = false;
                        return false;
                    }
                }
                break;
            // Add validation rules for other fields here
            default:
                break;
        }

        return error;
    };

    const PostData = async (e) => {
        if (e) {
            e.preventDefault();
        }
        console.log("in post");

        console.log(user);
        const { username, phoneNo, aadharNo, dob, email, password, } = user;
        console.log(username);
        //my
        try {
            if ((username && checkemail && Adhaar && phone && pass && Address && City)) {
                toggleLoader();
                axios.post('http://localhost:3002/candidate/verifyemail', user).then((response) => {
                    toggleLoader();
                    console.log("result", response);
                    if (response.status === 201) {
                        console.log('component caling');
                        history("/otpcomponent");
                    } else {
                        console.log("now i am in modal ")
                        // already register 
                        setUserRegistered(true);
                    }
                }).catch((error) => {
                    console.log('', error);
                })
            } else {
                console.log("something went wrong.... hehehhe ");
                setRegistrationStatus(true);
            }
        } catch (error) {
            console.log('Error:', error);
            window.alert('Failed to register');
        }
    };

    const PostData1 = async (e) => {
        if (e) {
            e.preventDefault();
        }
        if (incomSpanStatus) {
            console.log("in post");
            const formData = new FormData();
            for (const key in user1) {
                if (user1[key]) {
                    formData.append(key, user1[key]);
                }
            }
            console.log("user 1 : ", user1);
            console.log("form data : ", formData);
            // var userID = Cookie.get("userID");
            const aadharCardNumber = Cookie.get("aadharNumber");
            console.log(aadharCardNumber);
            try {
                toggleLoader();
                axios.post(`http://localhost:3002/candidate/documentRegistration/${aadharCardNumber}`, formData).then((result) => {
                    toggleLoader();
                    console.log(result);
                    if (result.status === 201) {
                        alert("document uploaded successfully");
                        //    setUserDocuments(true);
                        let inputElement = document.getElementById('collapseThree')
                        if (inputElement) {
                            const accordian = new window.bootstrap.Collapse(inputElement, {
                                togle: false
                            })
                            accordian.show();
                        }
                    } else {
                        console.log("Something went wrong....");
                    }
                }).catch((error) => {
                    console.log('', error);
                })
            } catch (error) {
                console.log('Error:', error);
                window.alert('Failed to register');
            }
        } else {
            alert("Enter right income Detail please.")
        }
    };


    const makePayment = async () => {
        try {
            const stripe = await loadStripe('pk_test_51O7qF0SJUnxcOIoS0sB7ANA2hIetDRhpRNTB4adPmYuOBzByrlhxBJaD9v5FFrUAlh9btXzUBeju1uuUHqZmbGgG00rLZ3hiG2');
            const detail = {
                enrollId: 123,
                amount: 100000
            }
            console.log('detail : ', detail);
            axios.post(`http://localhost:3002/candidate/payment`, detail).then((response) => {
                console.log('response', response);
                const result = stripe.redirectToCheckout({
                    sessionId: response.data.id
                });
            });
        }
        catch (error) {
            console.log('error', error);
        }
    }
    const print_state = () => {
        console.log('state : ');
        console.log('document : ', document.getElementById("state"));
        var option_str = document.getElementById("state");
        console.log('option : ', option_str);
        option_str.length = 0;
        option_str.options[0] = new Option('Select State', '');
        option_str.selectedIndex = 0;
        for (var i = 0; i < state_arr.length; i++) {
            option_str.options[option_str.length] = new Option(state_arr[i], state_arr[i]);
            console.log('option in for loop');
        }
    }
    const print_city = (e, city_id) => {
        var { name, value } = e.target;
        setUser({ ...user, [name]: value });
        validateField(name, value);
        var state_index = e.target.selectedIndex;
        console.log('option 2 : ', city_id);
        var option_str = document.getElementById(city_id);
        option_str.length = 0;
        option_str.options[0] = new Option('Select City', '');
        option_str.selectedIndex = 0;
        var city_arr = s_a[state_index].split("|");
        for (var i = 0; i < city_arr.length; i++) {
            option_str.options[option_str.length] = new Option(city_arr[i], city_arr[i]);
        }
    }
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            print_state();
        }, 1000); // Set the delay time in milliseconds (e.g., 1000ms = 1 second)

        // Clear the timeout on component unmount to prevent further execution
        return () => clearTimeout(timeoutId);
    }, []);

    function checkIncome(e) {

        let reg = /^[A-Za-z]+$/
        let incom = e.target.value;
        let name = e.target.name;

        if (incom.trim() == "") {
            document.getElementById('income').style.color = "red";
            document.getElementById('incomSpan').style.color = "red";
            document.getElementById('incomSpan').innerHTML = "Please fill this Field";
            incomSpanStatus = false

        }
        else if (reg.test(incom)) {
            document.getElementById('income').style.color = "red";
            document.getElementById('incomSpan').style.color = "red";
            document.getElementById('incomSpan').innerHTML = "Incom must be in digit form";
            incomSpanStatus = false

        }
        else {
            document.getElementById('income').style.color = "green";
            document.getElementById('incomSpan').style.color = "green";
            document.getElementById('incomSpan').innerHTML = "Looking Good";
            incomSpanStatus = true
            setUser1({ ...user1, [name]: incom });
        }

    }


    return (
        <>
        <Loader />
       
        <div className="container my-5" style={{ padding: "1 % 10 % 0 % 10 %" }}>
            <div className="" style={{ borderRadius: "2.5%", overflow: "hidden" }}>
                <div>
                    <img src={img1} width="100%" alt="" />
                </div>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" style={{
                                width: "100%", backgroundColor: "#fff", borderBottom: "2px solid red"
                            }} type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <h3>Basic Details</h3>
                            </button>
                        </h2>
                        <div id="collapseOne" className={`accordion-collapse collapse ${isFromOtp ? '' : 'show'}`} aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div id='firstaccordianloginform'>
                                    <form onSubmit={checkAadharNumber} encType="multipart/form-data">
                                        <div className="mt-4 col-sm-12 col-md-12 col-lg-12 d-block align-items-center text-center">
                                            <input type="" required maxLength='12' className="input-enter p-3 text-start" name="aadharCheck" placeholder="Enter Aadhar Card number" id="aadharCheck" onChange={(e) => handlecheckAadhar(e, 'aadharChck')} /><br />
                                            <span id="aadharCheckSpan">    </span><br />
                                            <input type="submit" className="btn btn-outline-danger w-25 mt-3" value="submit" style={{ height: "2.5vw" }} /><br /><br />
                                            <span>
                                                or <br />
                                            </span>
                                            <span id='registrationformspan' onClick={registrationform} >not registered yet ? Registration here</span>
                                        </div>
                                    </form>
                                </div>
                                <div id='firstaccordianbasicdetailform'>
                                    <form method='post' onSubmit={PostData}>
                                        <div className="row">
                                            <div className="mt-4 col-sm-12 col-md-12 col-lg-6 ">
                                                <div className='d-flex justify-content-center'>
                                                    <img src={img2} className="mt-4" height="20vh" alt="user_icon" />
                                                    <input type="text" required onChange={handleInputs} className="input-enter p-3" name="username" id="username" value={user.name} placeholder="Enter name" />
                                                </div>
                                                <div className='d-flex justify-content-center'>
                                                    <span id="usertext" style={{ marginTop: "10px" }} ></span>
                                                </div>
                                            </div>

                                            <div className="mt-4 col-sm-12 col-md-12 col-lg-6 ">
                                                <div className='d-flex justify-content-center'>
                                                    <img src={img3} className="mt-4" height="20vh" alt="user_icon" />
                                                    <input type="text" required maxLength='10' className="input-enter p-3" name="phoneNo" id="phoneNo" onChange={handleInputs} value={user.name}
                                                        placeholder="Enter Mobile Number" />
                                                </div>
                                                <div className='d-flex justify-content-center'>
                                                    <span id='phone'></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mt-4 col-lg-6 ">
                                                <div className='d-flex justify-content-center'>
                                                    <img src={img4} className="mt-4" height="20vh" alt="user_icon" />
                                                    <input type="text" required maxLength="12" className="input-enter p-3" name="aadharNo" id="aadharNo" onChange={handleInputs} value={user.aadharNo}
                                                        placeholder="Enter Adhaar Number" />
                                                </div>
                                                <div className='d-flex justify-content-center'>
                                                    <span id='adharno'></span>
                                                </div>

                                            </div>

                                            <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                                <img src={img5} className="mt-4" height="20vh" alt="user_icon" />
                                                <input type="date" min="01/01/1999" max={`${new Date().getDate}`} className="input-enter p-3" name="dob" onChange={handleInputs}
                                                    placeholder="Enter Date of Birth" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mt-4 col-lg-6">
                                                <div className='d-flex justify-content-center'>
                                                    <img src={img6} className="mt-4" height="20vh" alt="user_icon" />
                                                    <input type="text" className="input-enter p-3" name="email" id="email" onChange={handleInputs} value={user.email} placeholder="Enter your email"
                                                    />

                                                </div>
                                                <div className='d-flex justify-content-center'>
                                                    <span id='emailSpan'></span>
                                                </div>
                                            </div>
                                            <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                                <img src={img7} className="mt-4" height="20vh"
                                                    alt="user_icon" />
                                                <input type="password" className="input-enter p-3" name="password" id="password" onChange={handleInputs} value={user.password}
                                                    placeholder="Enter your password" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mt-4 col-lg-6 ">
                                                <div className='d-flex justify-content-center'>
                                                    <img src={img6} className="mt-4" height="20vh" alt="user_icon" />
                                                    <textarea rows="5" className="input-enter p-3 textarea" name="address" id="address" onChange={handleInputs} value={user.address} placeholder="Enter your Address"
                                                    />
                                                </div>
                                                <div className='d-flex justify-content-center'>
                                                    <span id='add'></span>
                                                </div>
                                            </div>
                                            <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                                <img src={img7} className="mt-4" height="20vh"
                                                    alt="user_icon" />
                                                <select id="state" required onChange={(e) => { print_city(e, 'city') }} name="state" className="input-enter p-3"  ></select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mt-4 col-lg-12 d-flex justify-content-center">
                                                <img src={img7} className="mt-4" height="20vh"
                                                    alt="user_icon" />
                                                <select id="city" required onChange={handleInputs} name='city' className="input-enter p-3" ></select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                                <input type="reset" className="btn btn-danger w-50 mt-3" value="Reset"
                                                    style={{ height: "2.5vw" }} />
                                            </div>
                                            <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                                <input type="submit" className="btn btn-outline-danger w-50 mt-3" value="submit" style={{ height: "2.5vw" }} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button"
                                style={{ width: "100%", border: "0", backgroundColor: "#fff", borderBottom: "2px solid red" }}
                                type="button" data-bs-toggle="collapse"
                                data-bs-target={`${isFromOtp ? '#collapseTwo' : ''}`} aria-expanded="true" aria-controls="collapseTwo">
                                <h3 style={{ color: "red", fontWeight: "600" }}>Documents Upload</h3>
                            </button>
                        </h2>
                        <div id="collapseTwo" className={`accordion-collapse collapse ${isFromOtp ? 'show' : ''}`} aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div id='secondaccordianform'>
                                    <form onSubmit={PostData1} encType="multipart/form-data">
                                        <div className="row">
                                            <div className="mt-4 col-sm-12 col-md-12 col-lg-6 d-block align-items-center">
                                                <img src={img8} className="mt-4" height="20vh" alt="user_icon"
                                                    style={{ marginLeft: "19.2%" }} />
                                                <input type="text" required id='income' className="input-enter p-3 text-start" name="income"
                                                    onChange={(e) => checkIncome(e)}
                                                    placeholder="Enter Family income" style={{ marginLeft: "4%" }} />
                                                <br /><span id="incomSpan" style={{ marginLeft: '160px' }}></span>
                                            </div>
                                            <div className="mt-4 col-sm-12 col-md-12 col-lg-6 d-flex justify-content-center">
                                                <img src={img8} className="mt-4" height="20vh"
                                                    alt="user_icon" />
                                                <input type="file" required id='aadharFile' className="custom-file-input" name="aadharFile"
                                                    onChange={(e) => handleFileChange1(e, 'aadharFile', 1)} style={{ width: "20%" }} />
                                                <label className=" custom-file-label m-4" htmlFor="username" id="fileLabel1"
                                                    style={{ width: "50%" }}>Upload Aadhar Card
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                                <img src={img8} className="mt-4" height="20vh"
                                                    alt="user_icon" />
                                                <input type="file" required className="custom-file-input" id='incomeCertificate' name="incomeCertificate"
                                                    onChange={(e) => handleFileChange1(e, 'incomeCertificate', 2)} style={{ width: "20%" }} />
                                                <label className="custom-file-label m-4" htmlFor="username" id="fileLabel2"
                                                    style={{ width: "50%" }}>Upload Income Certoficate
                                                </label>
                                            </div>
                                            <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                                <img src={img8} className="mt-4" height="20vh"
                                                    alt="user_icon" />
                                                <input type="file" required className="custom-file-input" id='fatherAadharcard' name="fatherAadharcard"
                                                    onChange={(e) => handleFileChange1(e, 'fatherAadharcard', 3)} style={{ width: "20%" }} />
                                                <label className="custom-file-label m-4" htmlFor="username" id="fileLabel3"
                                                    style={{ width: "50%" }}>Upload Father's Aadhar Card
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                                <img src={img8} className="mt-4" height="20vh"
                                                    alt="user_icon" />
                                                <input type="file" required className="custom-file-input" id='marksheet' name="marksheet"
                                                    onChange={(e) => handleFileChange1(e, 'marksheet', 4)} style={{ width: "20%" }} />
                                                <label className="custom-file-label m-4" id="fileLabel4"
                                                    style={{ width: "50%" }}>Upload 12th class Marksheet
                                                </label>
                                            </div>
                                            <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                                <img src={img8} className="mt-4" height="20vh"
                                                    alt="user_icon" />
                                                <input type="file" required className="custom-file-input" id='latestMarksheet' name="latestMarksheet"
                                                    onChange={(e) => handleFileChange1(e, 'latestMarksheet', 5)} style={{ width: "20%" }} />
                                                <label className="custom-file-label m-4" id="fileLabel5"
                                                    style={{ width: "50%" }}>Upload latest year marksheet
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                                <input type="reset" className="btn btn-danger w-50 mt-3" value="Reset"
                                                    style={{ height: "2.5vw" }} />
                                            </div>
                                            <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                                <input type="submit" className="btn btn-outline-danger w-50 mt-3" value="submit" id="sub"
                                                    style={{ height: "2.5vw" }} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button"
                                style={{ width: "100%", border: "0", backgroundColor: "#fff", borderBottom: "2px solid red" }}
                                type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true"
                                aria-controls="collapseThree">
                                <h3 style={{ color: "red", fontWeight: "600" }}>Payment Details</h3>
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <button className='btn btn-danger text-light' onClick={makePayment}>Pay Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========================== modal-1 for Already register... */}

            <div className="container my-5" style={{ padding: "1% 1% 0% 1%" }}>
                {/* Your form and other elements... */}
                <Modal
                    isOpen={isUserRegistered}
                    contentLabel="User Already Registered Modal"
                    style={modalCss}
                // You can customize modal styles and content here
                >
                    {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Launch static backdrop modal
                            </button> */}
                    <center><div classname="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ background: 'white', boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.3)", width: "100%", border: 'none', borderRadius: '10px', padding: '10px' }}  >
                        <div className="modal-dialog modal-dialog-centered " >
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title py-2" id="staticBackdropLabel">Modal title</h5>
                                    {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                                </div>
                                <div className="modal-body text-capitalize py-2" >
                                    you have already register please upadte your documents
                                </div>
                                <div className="modal-footer">
                                    <button onClick={() => setUserRegistered(false)} className="btn  mx-2 btn-danger text-white">Close Modal</button>
                                    <button type="button" className="btn btn-danger text-white">Understood</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </center>
                    {/* <h2>User Already Registered</h2>
                            <p>You can display a message or any content you want here.</p>
                            <button onClick={() => setUserRegistered(false)}>Close Modal</button> */}
                </Modal>
            </div>

            {/* ========================== modal-2 for documents succussfuly... */}
            <div className="container my-5" style={{ padding: "1% 1% 0% 1%" }}>
                {/* Your form and other elements... */}
                <Modal
                    isOpen={isUserDocuments}
                    contentLabel="User Already Registered Modal"
                    style={modalCss}
                // You can customize modal styles and content here
                >
                    <center><div classname="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ background: 'white', boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.3)", width: "100%", border: 'none', borderRadius: '10px', padding: '10px' }}  >
                        <div className="modal-dialog modal-dialog-centered " >
                            <div className="modal-content">
                                <div className="modal-header py-2">
                                    <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                                    {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                                </div>
                                <div className="modal-body py-2" >
                                    Documents Uploaded Successfully......
                                </div>
                                <div className="modal-footer">
                                    <button onClick={() => setUserDocuments(false)} className="btn btn-danger mx-2 text-white">Close Modal</button>
                                    <button type="button" className="btn btn-danger text-white">Understood</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </center>
                </Modal>
            </div>

            {/* ========================== modal-3 */}

            <div className="container my-5" style={{ padding: "1% 1% 0% 1%" }}>
                {/* Your form and other elements... */}
                <Modal
                    isOpen={registrationStatus}
                    contentLabel="User validation Modal"
                    style={modalCss}
                // You can customize modal styles and content here
                >
                    <center><div classname="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ background: 'white', boxShadow: "2px 2px 2px 2px green", width: "100%", border: 'none', borderRadius: '10px', padding: '10px' }}  >
                        <div className="modal-dialog modal-dialog-centered " >
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title py-2" id="staticBackdropLabel">Modal title</h5>
                                    {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                                </div>
                                <div className="modal-body py-2" >
                                    Something went wrong...... <br></br>Check the fields
                                </div>
                                <div className="modal-footer">
                                    <button onClick={() => setRegistrationStatus(false)} className="btn  mx-2 btn-danger text-white">Close Modal</button>
                                    <button type="button" className="btn btn-danger text-white">Understood</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </center>
                </Modal>
            </div>
        </div>
        </>
    );
}