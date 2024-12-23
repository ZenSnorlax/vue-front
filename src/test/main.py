import random
from faker import Faker
import datetime
import json
from typing import List, Dict

# 电影名称列表，您可以根据需要扩展或更新此列表
movie_names = [
    "泰坦尼克号",
    "复仇者联盟",
    "肖申克的救赎",
    "盗梦空间",
    "指环王",
    "黑暗骑士",
    "蜘蛛侠",
    "星际穿越",
    "海上钢琴师",
    "阿甘正传",
    "流浪地球",
    "战狼2",
    "我不是药神",
    "千与千寻",
    "疯狂的石头",
    "卧虎藏龙",
    "美丽心灵",
    "速度与激情",
    "钢铁侠",
    "变形金刚",
]
aditorium_names = [
    "影厅1",
    "影厅2",
    "影厅3",
    "影厅4",
    "影厅5",
    "影厅6",
    "影厅7",
    "影厅8",
    "影厅9",
    "影厅10",
]
status_options = ["未支付", "已支付", "已确认", "已观看", "已取消", "已退款"]
user_status_list = ["活跃", "禁用"]
shedule_status_list = ["未放映", "正在放映", "已放映"]
# 创建 Faker 实例，使用中文地区
fake = Faker("zh_CN")


def generate_random_datetime(days_range: int) -> str:
    """生成一个随机日期时间"""
    today = datetime.datetime.today()
    delta_days = random.randint(0, days_range)
    random_date = today - datetime.timedelta(days=delta_days)
    random_time = datetime.time(random.randint(0, 23), random.randint(0, 59))
    random_datetime = datetime.datetime.combine(random_date, random_time)
    return random_datetime.strftime("%Y-%m-%d %H:%M:%S")


def generate_user_data(num: int) -> List[Dict[str, str]]:
    user_data = []
    for _ in range(num):
        user_data.append(
            {
                "userId": str(random.randint(10000000, 99999999)),
                "userName": fake.name(),
                "userEmail": fake.email(),
                "userPhone": fake.phone_number(),
                "registrationTime": generate_random_datetime(
                    3650
                ),  # 在过去十年内随机选择日期
                "status": random.choice(user_status_list),
            }
        )
    return user_data


def generate_feedback_data(num: int) -> List[Dict[str, str]]:
    """生成反馈数据"""
    feedback_data = []
    for _ in range(num):
        feedback_data.append(
            {
                "orderId": str(random.randint(10000000, 99999999)),
                "userId": str(random.randint(10000000, 99999999)),
                "movieName": random.choice(movie_names),
                "feedback": fake.sentence(nb_words=10),
                "rating": random.randint(1, 5),
                "feedbackTime": generate_random_datetime(15),
            }
        )
    return feedback_data


def generate_order_data(num: int) -> List[Dict[str, str]]:
    """生成订单数据"""
    order_data = []
    for _ in range(num):
        order_data.append(
            {
                "orderId": str(random.randint(1000000, 99999999)),
                "userId": str(random.randint(10000000, 99999999)),
                "movieName": random.choice(movie_names),
                "aditoriumName": random.choice(aditorium_names),
                "status": random.choice(status_options),
                "orderTime": generate_random_datetime(15),
            }
        )
    return order_data


def generate_schedule_data(num: int) -> List[Dict[str, str]]:
    """生成放映计划数据"""
    schedule_data = []
    for _ in range(num):
        movie_name = random.choice(movie_names)
        start_time = generate_random_datetime(30)  # 随机生成一个开始时间（最近一个月）
        end_time = datetime.datetime.strptime(
            start_time, "%Y-%m-%d %H:%M:%S"
        ) + datetime.timedelta(
            minutes=random.randint(90, 180)
        )  # 随机电影时长 90 至 180 分钟
        end_time = end_time.strftime("%Y-%m-%d %H:%M:%S")

        schedule_data.append(
            {
                "scheduleId": str(random.randint(1000000, 99999999)),
                "movieName": movie_name,
                "auditorium": random.choice(aditorium_names),
                "startTime": start_time,
                "endTime": end_time,
                "status": random.choice(shedule_status_list),
            }
        )
    return schedule_data


def save_data_to_json(data: List[Dict], file_path: str) -> None:
    """将数据保存为 JSON 文件"""
    with open(file_path, "w", encoding="utf-8") as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)
    print(f"数据已成功导出到 '{file_path}'")


# 生成 1000 条放映计划数据并保存为 JSON 文件
schedule_data = generate_schedule_data(100)
save_data_to_json(schedule_data, "schedule_data.json")

# 生成 10 个用户数据并保存为 JSON 文件
#user_data = generate_user_data(1000)
#save_data_to_json(user_data, "user_data.json")

# 生成 1000 条反馈数据并保存为 JSON 文件
# feedback_data = generate_feedback_data(1000)
# save_data_to_json(feedback_data, "feedback_data.json")

# 生成 1000 条订单数据并保存为 JSON 文件
# order_data = generate_order_data(1000)
# save_data_to_json(order_data, "order_data.json")
