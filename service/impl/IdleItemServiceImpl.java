package com.second.hand.trading.server.service.impl;

import com.second.hand.trading.server.dao.IdleItemDao;
import com.second.hand.trading.server.dao.UserDao;
import com.second.hand.trading.server.model.IdleItemModel;
import com.second.hand.trading.server.model.UserModel;
import com.second.hand.trading.server.service.IdleItemService;
import com.second.hand.trading.server.vo.PageVo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class IdleItemServiceImpl implements IdleItemService {

    @Resource
    private IdleItemDao idleItemDao;

    @Resource
    private UserDao userDao;

    /**
     * 发布闲置
     * @param idleItemModel
     * @return
     */
    public boolean addIdleItem(IdleItemModel idleItemModel) {
        return idleItemDao.insert(idleItemModel) == 1;
    }

    /**
     * 查询闲置信息，同时查出发布者的信息
     * @param id
     * @return
     */
    public IdleItemModel getIdleItem(Long id) {
        IdleItemModel idleItemModel=idleItemDao.selectByPrimaryKey(id);
        if(idleItemModel!=null){
            idleItemModel.setUser(userDao.selectByPrimaryKey(idleItemModel.getUserId()));
        }
        return idleItemModel;
    }

    /**
     * 查询用户发布的所有闲置
     * user_id建索引
     * @param userId
     * @return
     */
    public List<IdleItemModel> getAllIdelItem(Long userId) {
        return idleItemDao.getAllIdleItem(userId);
    }

    /**
     * 搜索，分页
     * 同时查出闲置发布者的信息
     * @param findValue
     * @param page
     * @param nums
     * @return
     */
    public PageVo<IdleItemModel> findIdleItem(String findValue, int page, int nums) {
        List<IdleItemModel> list=idleItemDao.findIdleItem(findValue, (page - 1) * nums, nums);

        for (IdleItemModel i:list) {
            System.out.println(i.getIdleName() + ' ' + i.getIdleStatus() + '\n');
        }

        if(list.size()>0){
            List<Long> idList=new ArrayList<>();
            for(IdleItemModel i:list){
                idList.add(i.getUserId());
            }
            List<UserModel> userList=userDao.findUserByList(idList);
            Map<Long,UserModel> map=new HashMap<>();
            for(UserModel user:userList){
                map.put(user.getId(),user);
            }
            for(IdleItemModel i:list){
                i.setUser(map.get(i.getUserId()));
            }
        }

        int count=idleItemDao.countIdleItem(findValue);
        return new PageVo<>(list,count);
    }



    /**
     * 分类查询，分页
     * 同时查出闲置发布者的信息，代码结构与上面的类似，可封装优化，或改为join查询
     * @param idleLabel
     * @param page
     * @param nums
     * @return
     */
    public PageVo<IdleItemModel> findIdleItemByLable(int idleLabel, int page, int nums) {
        List<IdleItemModel> list=idleItemDao.findIdleItemByLable(idleLabel, (page - 1) * nums, nums);
        if(list.size()>0){
            List<Long> idList=new ArrayList<>();
            for(IdleItemModel i:list){
                idList.add(i.getUserId());
            }
            List<UserModel> userList=userDao.findUserByList(idList);
            Map<Long,UserModel> map=new HashMap<>();
            for(UserModel user:userList){
                map.put(user.getId(),user);
            }
            for(IdleItemModel i:list){
                i.setUser(map.get(i.getUserId()));
            }
        }
        int count=idleItemDao.countIdleItemByLable(idleLabel);
        return new PageVo<>(list,count);
    }

    /**
     * 更新闲置信息
     * @param idleItemModel
     * @return
     */
    public boolean updateIdleItem(IdleItemModel idleItemModel){
        return idleItemDao.updateByPrimaryKeySelective(idleItemModel)==1;
    }

    public PageVo<IdleItemModel> adminGetIdleList(int status, int page, int nums) {
        List<IdleItemModel> list=idleItemDao.getIdleItemByStatus(status, (page - 1) * nums, nums);
        if(list.size()>0){
            List<Long> idList=new ArrayList<>();
            for(IdleItemModel i:list){
                idList.add(i.getUserId());
            }
            List<UserModel> userList=userDao.findUserByList(idList);
            Map<Long,UserModel> map=new HashMap<>();
            for(UserModel user:userList){
                map.put(user.getId(),user);
            }
            for(IdleItemModel i:list){
                i.setUser(map.get(i.getUserId()));
            }
        }
        int count=idleItemDao.countIdleItemByStatus(status);
        return new PageVo<>(list,count);
    }



    // 根据不同的状态查找闲置物品
    @Override
    public PageVo<IdleItemModel> findIdleItem1(String findValue, int status, int page, int nums) {

        List<IdleItemModel> list=idleItemDao.findIdleItem1(findValue, status, (page - 1) * nums, nums);

        if(list.size()>0){
            List<Long> idList=new ArrayList<>();
            for(IdleItemModel i:list){
                idList.add(i.getUserId());
            }
            List<UserModel> userList=userDao.findUserByList(idList);
            Map<Long,UserModel> map=new HashMap<>();
            for(UserModel user:userList){
                map.put(user.getId(),user);
            }
            for(IdleItemModel i:list){
                i.setUser(map.get(i.getUserId()));
            }
        }
        int count=idleItemDao.countIdleItem(findValue);

//        System.out.println("------------------------------------下架的--------------------------");
//        for (IdleItemModel i:list) {
//
//            System.out.println(i.getIdleName());
//            System.out.println(i.getIdleStatus());
//            System.out.println(i.getIdlePlace());
//            System.out.println(i.getReleaseTime());
//            System.out.println(i.getPictureList());
//            System.out.println(i.getIdlePrice());
//            System.out.println(i.getIdleLabel());
//
//        }

        return new PageVo<>(list,count);

    }

    /**
     * 获取各个商品分类的统计数据
     * @return 包含分类名称和对应数量的列表
     */
    @Override
    public List<Map<String, Object>> getCategoryStatistics() {
        List<Map<String, Object>> rawData = idleItemDao.countItemsByCategory();

        // 与首页分类完全一致：1数码科技，2生活用品，3运动相关，4图书笔记，5公告
        Map<Integer, String> categoryNames = new LinkedHashMap<>();
        categoryNames.put(1, "数码科技");
        categoryNames.put(2, "生活用品");
        categoryNames.put(3, "运动相关");
        categoryNames.put(4, "图书笔记");
        categoryNames.put(5, "公告");

        Map<Integer, Integer> countMap = new HashMap<>();
        for (Map<String, Object> item : rawData) {
            Object categoryObj = item.get("category");
            Object countObj = item.get("count");
            if (!(categoryObj instanceof Number) || !(countObj instanceof Number)) {
                continue;
            }
            int categoryId = ((Number) categoryObj).intValue();
            int count = ((Number) countObj).intValue();
            countMap.put(categoryId, count);
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<Integer, String> entry : categoryNames.entrySet()) {
            Integer categoryId = entry.getKey();
            Map<String, Object> row = new HashMap<>();
            row.put("category", categoryId);
            row.put("categoryName", entry.getValue());
            row.put("count", countMap.getOrDefault(categoryId, 0));
            result.add(row);
        }

        return result;
    }
}
