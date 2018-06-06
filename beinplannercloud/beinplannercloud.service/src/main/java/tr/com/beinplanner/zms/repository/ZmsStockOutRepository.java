package tr.com.beinplanner.zms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tr.com.beinplanner.zms.dao.ZmsStockOut;

@Repository
public interface ZmsStockOutRepository  extends CrudRepository<ZmsStockOut, Long>{

	public List<ZmsStockOut> findByProductId(long productId);
	
	@Query(value="SELECT b.* FROM zms_stock_out b " + 
			"				 WHERE b.PRODUCT_ID IN (SELECT PRODUCT_ID FROM zms_product WHERE FIRM_ID=:firmId)"
			+ "                AND b.SELL_STATU=:statu	",nativeQuery=true )
	public List<ZmsStockOut> findAllZmsStockInGroupByProduct(@Param("firmId") int firmId,@Param("statu") int statu);
	
	
	@Query(value="SELECT b.* FROM zms_stock_out b " + 
			"				 WHERE b.PRODUCT_ID =:productId "
			+ "                AND b.SELL_STATU=:statu	",nativeQuery=true )
	public List<ZmsStockOut> findZmsStockOutByProduct(@Param("statu") int statu,@Param("productId") long productId);
	
	
	@Query(value="SELECT b.* FROM zms_stock_out b " + 
			"				 WHERE b.USER_ID IN (SELECT USER_ID FROM user WHERE FIRM_ID=:firmId"
			+ "                                                             AND USER_NAME LIKE (:userName)"
			+ "																AND USER_SURNAME LIKE (:userSurname)) ",nativeQuery=true )
	public List<ZmsStockOut> findZmsStockOutByUsernameAndSurname(@Param("firmId") int firmId,@Param("userName") String userName,@Param("userSurname") String userSurname);
	
	
}
