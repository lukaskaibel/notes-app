from django.shortcuts import render, redirect, get_object_or_404
from .models import Note
from .forms import NoteForm
from django.http import JsonResponse
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json


def notes_list_json(request):
    notes = Note.objects.all()
    return JsonResponse(serialize("json", notes), safe=False)


@method_decorator(csrf_exempt, name="dispatch")
def note_detail(request):
    if request.method == "GET":
        try:
            data = json.loads(request.body)
            pk = data["id"]  # Get the primary key from the JSON payload
            note = get_object_or_404(Note, pk=pk)
            # Return note details as JSON
            return JsonResponse(
                {"id": note.pk, "title": note.title, "content": note.content}
            )
        except KeyError:
            return JsonResponse({"error": "Missing note ID in request"}, status=400)
        except ValueError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Note.DoesNotExist:
            return JsonResponse({"error": "Note not found"}, status=404)
    else:
        return JsonResponse({"error": "Only POST method is accepted"}, status=405)


@method_decorator(csrf_exempt, name="dispatch")
def note_create(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            note = Note.objects.create(title=data["title"], content=data["content"])
            return JsonResponse(
                {"id": note.pk, "title": note.title, "content": note.content},
                status=201,
            )
        except (KeyError, ValueError) as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Only POST method is accepted"}, status=405)


@method_decorator(csrf_exempt, name="dispatch")
def note_edit(request):
    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            pk = data["id"]  # Get the primary key from JSON
            note = get_object_or_404(Note, pk=pk)
            note.title = data.get("title", note.title)  # Update the title if provided
            note.content = data.get(
                "content", note.content
            )  # Update the content if provided
            note.save()
            return JsonResponse(
                {"id": note.pk, "title": note.title, "content": note.content},
                status=200,
            )
        except KeyError:
            return JsonResponse({"error": "Missing data in request"}, status=400)
        except ValueError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    else:
        return JsonResponse({"error": "Only PUT method is accepted"}, status=405)


@method_decorator(csrf_exempt, name="dispatch")
def note_delete(request):
    if request.method == "DELETE":
        try:
            data = json.loads(request.body)
            pk = data["id"]  # Ensure this 'id' corresponds to the primary key
            note = get_object_or_404(Note, pk=pk)
            note.delete()
            return JsonResponse({"message": "Note deleted successfully"}, status=200)
        except KeyError:
            return JsonResponse({"error": "Missing note ID in request"}, status=400)
        except ValueError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    else:
        return JsonResponse({"error": "Only POST method is accepted"}, status=405)
