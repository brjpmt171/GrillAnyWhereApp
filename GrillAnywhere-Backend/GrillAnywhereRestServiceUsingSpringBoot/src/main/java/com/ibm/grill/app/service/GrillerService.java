package com.ibm.grill.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.grill.app.model.Griller;
import com.ibm.grill.app.model.Purchase;
import com.ibm.grill.app.model.User;
import com.ibm.grill.app.repository.GrillerRepositoryImpl;
import com.ibm.grill.app.repository.GrillerRepositoryMySQL;
import com.ibm.grill.app.repository.PurchaseRepository;
import com.ibm.grill.app.repository.UserRepository;




@Service
public class GrillerService {
	

	@Autowired
	private GrillerRepositoryMySQL grillerRepository;
	@Autowired
	private GrillerRepositoryImpl grillerRepositoryCustom;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PurchaseRepository purchaseRepository;

	public void add(Griller griller) {
//		int empId = employees.size() + 1;	
//		employee.setId(empId);			
//		employees.put(employee.getId(), employee);
		grillerRepository.save(griller);
	}

	public void update(Griller griller) {

//		employees.put(employee.getId(), employee);
		grillerRepository.save(griller);
	}
	public int updateFlag(int id) {

return grillerRepositoryCustom.updateFlag(id);
	}

	public Griller get(int grillID) {
		return grillerRepository.findById(grillID).get();
	}

	public void delete(int grillID) {
		grillerRepository.deleteById(grillID);
	}

	public List<Griller> list(String grillerFlag,int id) {		

		return (List<Griller>) grillerRepository.findByGrillerFlagAndOwnerID(grillerFlag,id);	
	}
	public List<Griller> list(String grillerFlag) {		

		return (List<Griller>) grillerRepository.findByGrillerFlag(grillerFlag);	
	}
	
	public List<Griller> listByGrillerType(String grillerType, String grillerFlag) {		
//		return new ArrayList<Employee>(employees.values());
		return (List<Griller>) grillerRepository.findByGrillerType(grillerType,grillerFlag);
	}
	
//	

	public List<Griller> findByLocation(String location, String grillerFlag)
	{
		return grillerRepository.findByLocation(location,grillerFlag);
	}
//	public List<Griller> findByGrillerType(String grillType)
//	{
//		return grillerRepository.findByGrillerType(grillType);
//	}

	

	public boolean addPurchase(Purchase purchase) {
		// TODO Auto-generated method stub
		purchaseRepository.save(purchase);
		return true;
	}

	public List<Griller> listByRenter(String renter) {
		// TODO Auto-generated method stub
		return (List<Griller>) purchaseRepository.findByRenter(renter);	}

	public List<Griller> findByGrillName(String grillName) {
		// TODO Auto-generated method stub
		return grillerRepository.findByGrillName(grillName);
	}
	
	public List<Griller> findByNameLike(String name,String grillerFlag){
		return grillerRepository.findByNameLike(name,grillerFlag);
	}

	public List<Griller> listRented(String grillerFlag) {
		// TODO Auto-generated method stub
		return (List<Griller>) grillerRepository.findRentedGriller(grillerFlag);	
	}

	public Griller updateFlag(int grillId, String grillerFlag) {
		// TODO Auto-generated method stub
		Griller grill=grillerRepository.findById(grillId).get();
		grill.setGrillerFlag(grillerFlag);
		return grillerRepository.save(grill);
	}

	public List<Griller> list(String grillerFlag, int ownerId, String type) {
		// TODO Auto-generated method stub
		return (List<Griller>) grillerRepository.findByGrillerFlagAndOwnerIDAndGrillerType(grillerFlag,ownerId,type);	
		
	}
	public List<Griller> listByCity(String grillerFlag, int ownerId, String city) {
		// TODO Auto-generated method stub
		return (List<Griller>) grillerRepository.findByGrillerFlagAndOwnerIDAndLocation(grillerFlag,ownerId,city);	
		
	}

	public User getOwnerData(long id) {
		// TODO Auto-generated method stub
		return userRepository.findById(id).get();
	}


	



	
}