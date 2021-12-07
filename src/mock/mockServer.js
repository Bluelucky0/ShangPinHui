import Mock from 'mockjs'
//webpack默认对外暴露的数据格式：图片和json数据格式，所以JSON数据文件不用对外暴露，直接引入
import banners from './banners.json'
import floors from './floors.json'

Mock.mock('/mock/banner',{code:200,data:banners})
Mock.mock('/mock/floor',{code:200,data:floors})