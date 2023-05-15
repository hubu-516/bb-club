#include <functional>  // for function
#include <iostream>  // for basic_ostream::operator<<, operator<<, endl, basic_ostream, basic_ostream<>::__ostream_type, cout, ostream
#include <memory>    // for allocator, shared_ptr, __shared_ptr_access
#include <string>  // for char_traits, to_string, operator+, string, basic_string
 #include <fstream>   //主要用于文件读写操作，包括ifstream和ofstream等函数。
#include <string>     //主要用于字符串操作，包括string类型和getline等函数。
#include <vector>  //主要用于字符串操作，包括string类型和getline等函数。
#include <cstdlib>  //主要用于动态数组操作，包括vector类型和push_back等函数。
#include <ctime> // 主要用于随机数生成，包括srand和rand等函数

#include "ftxui/component/captured_mouse.hpp"  // for ftxui
#include "ftxui/component/component.hpp"  // for MenuEntry, Renderer, Vertical
#include "ftxui/component/component_base.hpp"      // for ComponentBase
#include "ftxui/component/component_options.hpp"   // for MenuEntryOption
#include "ftxui/component/screen_interactive.hpp"  // for ScreenInteractive
#include "ftxui/dom/elements.hpp"  // for operator|, Element, separator, text, hbox, size, frame, color, vbox, HEIGHT, LESS_THAN, bold, border, inverted
#include "ftxui/screen/color.hpp"  // for Color, Color::Blue, Color::Cyan, Color::Green, Color::Red, Color::Yellow
 #include "ftxui/util/ref.hpp"  // for Ref
using namespace ftxui;
using namespace std;

bool throwed = false;
bool took = false;
string con;
string con2;
string mes;
int out_case=0;
void takeBottle()
{
    // 打开文件
    ifstream file;//创建一个ifstream对象file，和ofstream对象file创建类似 
    file.open("message.txt");//打开message.txt文件，默认的文件打开模式 ios::in表示打开文件进行读取操作

    // 读取文件中的消息
    vector<string> messages;//创建一个空的字符串向量 messages用来存储从文件中读取的所有消息
    string line;//定义一个字符串变量 line，用来存储从文件中读取的每一行消息
    while (getline(file, line))//循环读取文件中的每一行消息，读取成功就继续循环，失败就退出 
    {
        messages.push_back(line);//将读取到的消息存储到字符串向量messages中
    }

    // 随机选择一条消息
    if (messages.size() > 0)//messages非空有漂流瓶
    {
        srand(time(NULL));//生成一个随机的漂流瓶索引index，随机选择一条漂流瓶消息
        int index = rand() % messages.size();//srand()函数初始化随机数生成器，time(NULL)函数返回当前时间作为 srand()函数的种子，系统时间每次都不一样，因此能实现随机效果rand()函数用来生成随机数
        if(took == false)
        {
        con= "你捡起了一条漂流瓶，里面的消息是：\n" + messages[index];
        took = true;
        }

    }
    else
    {
        con= "没有漂流瓶可供捡起。";
    }

    // 关闭文件
    file.close();//周啸宇：这几个函数逻辑都很简单，基本只涉及一两个分支和1一两个条件判断，注释也有，可以自己理解画图，我负责画main 
}
void throwBottle()
{
    // 获取用户输入
   //zxy：建议功能注释写里面别写旁边看着顺一些
  //zxy：具体一些函数使用写旁边
    string message;                                        //message是一个string类型变量，存储用户输入的消息
    
    message=mes;
    // 打开文件
    ofstream file;//创建一个ofstream对象file 
    file.open("message.txt", ios::app);//file打开message.txt文件，ios::app标志打开文件时会将写操作（将数据存入存储器）附加到文件末尾（写入时采用追加方式），保留文件中已有的内容。

    // 将消息写入文件
    file << message << endl;//写操作，然后换行 
    con="你的消息已经被漂流瓶扔出去了！";
    throwed = true;
    out_case=0;
    // 关闭文件
    file.close();//file.open()打开文件file.close()关闭文件 
    
}

// Define a special style for some menu entry.
MenuEntryOption Colored(ftxui::Color c) {
  MenuEntryOption option;
  option.transform = [c](EntryState state) {
    state.label = (state.active ? "> " : "  ") + state.label;
    Element e = text(state.label) | color(c);
    if (state.focused)
      e = e | inverted;
    if (state.active)
      e = e | bold;
    return e;
  };
  return option;
}
 
int main(int argc, const char* argv[]) {
  system("setterm -foreground black");
  auto screen = ScreenInteractive::TerminalOutput();
  Component input_mes = Input(&mes, "123");
  Component button_input=Button("发布", [&] {throwBottle();con2="已扔出"; }, ButtonOption::Animated(Color::Red))|color(Color::Blue);
  int selected = 0;
  auto menu = Container::Vertical(
      {
          MenuEntry(" 1. small game", Colored(Color::Blue3)),
          MenuEntry(" 2. 扔瓶子", Colored(Color::Yellow)),
          MenuEntry(" 3. 捡瓶子", Colored(Color::Green)),
          MenuEntry(" 4. 关于", Colored(Color::Blue)),

      },
      &selected);
auto input_line =Container::Horizontal({
   Input(&mes, "输入纸条内容")|flex,
    button_input,
  
});

  // Display together the menu with a border
  auto renderer = Renderer(menu, [&] {
    switch  (selected)
           {
            case 1: 
                con="输入漂流瓶的内容";
                if(throwed == true && con2=="已扔出")
                {
                  
                  con = "已扔出(一次只能扔一个哦)";
                  out_case=0;
                }
                else
                {
                  out_case=1;  
                }  
            break;
           case 2:
           out_case=0;
           takeBottle();
           break;
           case 3:
           con="本程序基于c++和ftxui库,采用ttyd进行远程模拟终端.";
           break;

           default:
            break;
           }
    return vbox({
                hbox(text("漂流瓶"))|center|color(Color::Black) ,
               hbox(text("selected = "), text(std::to_string(selected))),
               separator(),
               menu->Render() | frame | size(HEIGHT, LESS_THAN, 10),
               separator(),

          hbox({
              
              paragraphAlignCenter(con),
              
          })|size(HEIGHT, GREATER_THAN, 10),

           }) |
           border |color(Color::Black);
           
                  
  });
 
auto renderer_input = Renderer(input_line,[&]{
  if(out_case==0)
  {
    return vbox();
  }
  else return vbox({
              hbox({         
                 input_line->Render() 
                  
              }),
              hbox({
              filler(),
              paragraphAlignCenter(con2),
              filler(),
          }),
            })|border |color(Color::Black);

});







auto main_loop = Container::Vertical({
    renderer,
    renderer_input,
  });
  if(out_case==0)
  screen.Loop(main_loop);
  else
  screen.Loop(main_loop);
  
 
}
 
// Copyright 2020 Arthur Sonzogni. All rights reserved.
// Use of this source code is governed by the MIT license that can be found in
// the LICENSE file.