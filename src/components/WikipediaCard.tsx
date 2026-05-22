"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen, ExternalLink, Loader2 } from "lucide-react";
import { getWikipediaContent } from "@/services/wikipediaService";

interface WikipediaCardProps {
  term: string;
  title?: string;
}

export function WikipediaCard({ term, title }: WikipediaCardProps) {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expanded && !content && !loading) {
      fetchContent();
    }
  }, [expanded]);

  const fetchContent = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getWikipediaContent(term);
      if (data) {
        setContent(data);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            {title || "Información de Wikipedia"}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Ocultar" : "Mostrar"}
          </Button>
        </CardTitle>
      </CardHeader>

      {expanded && (
        <CardContent>
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Cargando contenido...</span>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>
                No se pudo cargar el contenido de Wikipedia. Intenta de nuevo más tarde.
              </AlertDescription>
            </Alert>
          )}

          {content && !loading && (
            <div className="space-y-4">
              {content.thumbnail && (
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-md"
                />
              )}

              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {content.extract}
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(content.url, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Leer artículo completo en Wikipedia
              </Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}