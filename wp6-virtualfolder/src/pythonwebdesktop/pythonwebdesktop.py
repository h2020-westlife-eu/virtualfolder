#!/usr/bin/env python
# author Tomas Kulhanek
# desktop background as web page using webkit and proxy settings
# https://kmandla.wordpress.com/2010/05/24/the-1-2kb-python-browser-script/
# - proxy support is included in webkit no need of -- http://stackoverflow.com/questions/6915840/python-webkit-with-proxy-support
# http://superuser.com/questions/419195/set-an-html-page-as-the-wallpaper-on-linux

import sys
import gtk
import webkit
import webbrowser
import ctypes
import os

DEFAULT_URL = 'http://localhost/' # Change this as you Wish
class SimpleBrowser: # needs GTK, Python, Webkit-GTK
    def __init__(self):
        # - proxy support is included in current webkit version, no need of
        #self.http_proxy = os.environ.get('http_proxy');
        #if (not(self.http_proxy is None)):
        # only for environments behind proxy
        #    libgobject = ctypes.CDLL('/usr/lib/x86_64-linux-gnu/libgobject-2.0.so.0')
        #    libwebkit = ctypes.CDLL('/usr/lib/x86_64-linux-gnu/libsoup-2.4.so.1')
        #    libsoup = ctypes.CDLL('/usr/lib/x86_64-linux-gnu/libsoup-2.4.so.1')
        #    libwebkit = ctypes.CDLL('/usr/lib/x86_64-linux-gnu/libwebkitgtk-1.0.so.0')
        #    proxy_uri = libsoup.soup_uri_new(self.http_proxy)  # set your proxy url
        #    session = libwebkit.webkit_get_default_session()
        #    libgobject.g_object_set(session, "proxy-uri", proxy_uri, None)
        # end of proxy
        self.window = gtk.Window(gtk.WINDOW_TOPLEVEL)
        #self.window.set_position(gtk.WIN_POS_CENTER_ALWAYS)
        self.window.connect('delete_event', self.close_application)
        self.window.set_default_size(640, 480)
        self.window.maximize()
        self.window.set_keep_below(True)
        vbox = gtk.VBox(spacing=5)
        vbox.set_border_width(5)
        #self.window.set_has_frame(False) probably superseeded by following
        self.window.set_decorated(False)
        self.txt_url = gtk.Entry()
        self.txt_url.connect('activate', self._txt_url_activate)
        self.scrolled_window = gtk.ScrolledWindow()
        self.webview = webkit.WebView()
        self.webview.open
        self.scrolled_window.add(self.webview)
        vbox.pack_start(self.scrolled_window, fill=True, expand=True)
        self.window.add(vbox)
        self.webview.connect("new-window-policy-decision-requested", self.newWin)
    def _txt_url_activate(self, entry):
        self._load(entry.get_text())
    def _load(self, url):
        self.webview.open(url)
    def open(self, url):
        self.txt_url.set_text(url)
        self.window.set_title('%s' % url)
        self._load(url)
    def show(self):
        self.window.show_all()
    def close_application(self, widget, event, data=None):
        gtk.main_quit()
    def newWin(self, view, frame, request, nav_action, policy_decision):
        # calls the open on the desktop background ??
        webbrowser.open_new_tab(request.get_uri())
        return True
if __name__ == '__main__':
    if len(sys.argv) > 1:
        url = sys.argv[1]
    else:
        url = DEFAULT_URL
    gtk.gdk.threads_init()
    browser = SimpleBrowser()
    browser.open(url)
    browser.show()
    gtk.main()