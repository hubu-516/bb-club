cmake_minimum_required (VERSION 3.11)
 
# --- Fetch FTXUI --------------------------------------------------------------
include(FetchContent)
set(CMAKE_CXX_STANDARD 17)
FetchContent_Declare(ftxui
  GIT_REPOSITORY https://gitee.com/mirrors/ftxui
  GIT_TAG v4.0.0
)

FetchContent_GetProperties(ftxui)
if(NOT ftxui_POPULATED)
  FetchContent_Populate(ftxui)
  add_subdirectory(${ftxui_SOURCE_DIR} ${ftxui_BINARY_DIR} EXCLUDE_FROM_ALL)
endif()
 
project(bottle LANGUAGES CXX)

add_executable(bottle 1.cpp)
target_include_directories(bottle PRIVATE src)

target_link_libraries(bottle
  PRIVATE ftxui::screen
  PRIVATE ftxui::dom
  PRIVATE ftxui::component # Not needed for this example.
)