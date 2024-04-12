from django.urls import path
from . import views

urlpatterns = [
    path("note/get/", views.note_detail, name="note_detail"),
    path("note/new/", views.note_create, name="note_create"),
    path("note/edit/", views.note_edit, name="note_edit"),
    path("note/delete/", views.note_delete, name="note_delete"),
    path("note/list/", views.notes_list_json, name="notes_list_json"),
]
